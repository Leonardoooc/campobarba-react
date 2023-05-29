import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AuthContext } from '../../contexts/auth'
import { useContext, useEffect, useState } from 'react'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2, FiTrash } from 'react-icons/fi'
import { collection, getDocs, orderBy, limit, startAfter, query, doc, deleteDoc} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

import { format } from 'date-fns'
import './dashboard.css';

const listRef = collection(db, "agendamentos")

export default function Dashboard() {

    const [agendamentos, setAgendamentos] = useState([])
    const [loading, setLoading] = useState(true);

    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        async function loadAgendamentos(){
          const q = query(listRef, orderBy('created', 'desc'), limit(5));
    
          const querySnapshot = await getDocs(q)
          setAgendamentos([]);
    
          await updateState(querySnapshot)
    
          setLoading(false);
    
        }
    
        loadAgendamentos();
    
    
        return () => { }
    }, [])

    async function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0;
    
        if(!isCollectionEmpty){
          let lista = [];
    
          querySnapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              data: doc.data().data,
              cliente: doc.data().user,
              created: doc.data().created,
              horario: doc.data().horario,
              celular: doc.data().celular
            })
          })
    
          const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // Pegando o ultimo item
    
          setAgendamentos(agendamentos => [...agendamentos, ...lista])
          setLastDocs(lastDoc);
    
        }else{
          setIsEmpty(true);
        }
    
        setLoadingMore(false);
    
      }

      async function handleMore(){
        setLoadingMore(true);
    
        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs),  limit(5));
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);
    
      }

      async function deleteAgendamento(item) {
        const docRef = doc(db, "agendamentos", item.id)

        await deleteDoc(docRef).then(() => {
          setAgendamentos(agendamentos => agendamentos.filter(a => a.id !== item.id));
          toast.info("Agendamento deletado com sucesso.")
          
        }).catch((error) => {
          toast.error("Erro ao deletar agendamento.")
          console.log(error)
        })
      }

    return(
        <div id="wrapper">
            <Header/>
            <div className="content">
              <>
                {agendamentos.length === 0 ? (
                  <div className="container dashboard">
                    <span>Nenhum agendamento encontrado no sistema!</span>
                  </div>
                ) : (
                <>
                  <div id="area-principal">

                  <div id="area-sobrenos">
                      <div className="postagem-sobrenos">
                          <div className="dashboard">
                            <table>
                              <thead>
                                <tr>
                                  <th scope="col">Cliente</th>
                                  <th scope="col">Data</th>
                                  <th scope="col">Horario</th>
                                  <th scope="col">Telefone</th>
                                  <th scope="col">#</th>
                                </tr>
                              </thead>
                              <tbody>
                                {agendamentos.map((item, index) => {
                                  return(
                                    <tr key={index}>
                                      <td data-label="Cliente">{item.cliente}</td>
                                      <td data-label="Data">{item.data}</td>
                                      <td data-label="Horario">{item.horario}</td>
                                      <td data-label="Telefone">{item.celular}</td>
                                      <td data-label="#">
                                        <button className="action" style={{ backgroundColor: '#FA8072' }} onClick={ () => deleteAgendamento(item)}>
                                          <FiTrash color='#FFF' size={17}/>
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>   
                            {loadingMore && <h3 style={{color: '#fff'}}>Buscando mais agendamentos</h3>}    
                            {!loadingMore && !isEmpty && <button className="btn btn-outline-warning link btn-spacing" onClick={handleMore}>Mostrar mais</button>  }  
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            </div>
            <Footer/>
          </div>
    );
}
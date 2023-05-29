import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import './home.css';


import { AuthContext } from '../../contexts/auth'
import { useContext, useEffect, useState } from 'react'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2, FiTrash } from 'react-icons/fi'
import { collection, getDocs, orderBy, limit, startAfter, query, doc, deleteDoc} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

import { format } from 'date-fns'

const listRef = collection(db, "posts")

function Home() {

    const { user } = useContext(AuthContext);

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        async function loadPosts(){
          const q = query(listRef, orderBy('created', 'desc'), limit(3));
    
          const querySnapshot = await getDocs(q)
          setPosts([]);
    
          await updateState(querySnapshot)
    
          setLoading(false);
    
        }
    
        loadPosts();
    
    
        return () => { }
    }, [])


    async function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0;
    
        if(!isCollectionEmpty){
          let lista = [];
    
          querySnapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              title: doc.data().title,
              subtitle: doc.data().subtitle,
              description: doc.data().description,
              image: doc.data().postUrl,
            })
          })
    
          const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
    
          setPosts(posts => [...posts, ...lista])
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

      async function deletePost(post) {

        if (!user) {
            return;
        }

        const docRef = doc(db, "posts", post.id)

        await deleteDoc(docRef).then(() => {
          setPosts(posts => posts.filter(a => a.id !== post.id));
          toast.info("Post deletado com sucesso.")
          
        }).catch((error) => {
          toast.error("Erro ao deletar post.")
          console.log(error)
        })
      }
      

    return (
        <div id="wrapper">
            <Header />
            <main>
                <section id="home" className="d-flex">
                    <div className="container align-self-center">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="area-principal">

                                    <div id="area-postagens">
                                        {user && (
                                            <Link to="/post" className="btn btn-outline-success link">Novo post</Link>
                                        )}

                                        {posts.map(post => (
                                            <div className="postagem" key={post.id}>
                                                <h2 className="titulosecundario">{post.title}</h2>
                                                <br />
                                                <span className="subtitulo data-postagem">{post.subtitle}</span>
                                                <img className="img-fluid" width="620px" src={post.image} alt={post.title} />
                                                <p className="paragrafo">{post.description}</p>
                                                <br />
                                                {user && (
                                                    <button className="btn btn-outline-danger link" onClick={ () => deletePost(post)}>Deletar post</button>
                                                )}
                                            </div>
                                        ))}
                                        {loading && <p>Carregando...</p>}
                                        {!loading && isEmpty && <p>Nenhum post encontrado.</p>}
                                        {!loading && !isEmpty && (
                                        <div className="text-center">
                                            <button type="button" className="btn btn-outline-warning link" onClick={handleMore} disabled={loadingMore}>
                                            {loadingMore ? 'Carregando...' : 'Carregar mais'}
                                            </button>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Home;

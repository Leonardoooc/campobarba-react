import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import './contato.css';

import { useState, useEffect, useContext  } from 'react'
import { FiPlusCircle } from 'react-icons/fi'

import {AuthContext} from '../../contexts/auth'
import { db } from '../../services/firebaseConnection'
import {collection, getDocs, getDoc, doc, addDoc, updateDoc} from 'firebase/firestore'

import { useParams, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

export default function Contato() {

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [celular, setCelular] = useState('')
    const [data, setData] = useState('')
    const [horario, setHorario] = useState('')

    async function handleRegister(e){
        e.preventDefault();

        if (!user) {
            return;
        }

        function validarCampos(celular, data, horario) {
            if (celular === '' || data === '' || horario === '') {
                toast.error("Os campos estão vazios!");
                return false;
            }

            function validarCelular(celular) {
                const numero = celular.replace(/\D/g, '');
                const regex = /^(\d{11}|\d{10}|\d{2}\s\d{5}\-\d{4}|\(\d{2}\)\s\d{8}|\(\d{2}\)\s\d{5}\-\d{4})$/;
                return regex.test(numero);
            }

            if (!validarCelular(celular)) {
                toast.error("Celular inválido!");
                return false;
            }
            
            if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
                toast.error("Data inválida!");
                return false;
            }
            
            if (!/^\d{2}:\d{2}$/.test(horario)) {
                toast.error("Horário inválido");
                return false;
            }

            return true;
        }
          
        if (validarCampos(celular, data, horario)) {
            await addDoc(collection(db, "agendamentos"), {
                created: new Date(),
                celular: celular,
                data: data,
                horario: horario,
                user: user.nome,
            })
            .then(() => {
                setCelular('');
                setData('')
                setHorario('')
                toast.success("Agendamento registrado, obrigado por entrar em contato conosco!")
            })
            .catch((error) => {
                toast.error("Ops erro ao registrar agendamento, tente mais tarde!")
                console.log(error);
            })
        } else {
            return false;
        }
        
      }


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext)

    async function handleSignIn(e){
        e.preventDefault();

        if(email !== '' && password !== '') {
            await signIn(email, password);
        }

    }

    return(
        <div id="wrapper">
            <Header />
            <main>
            <section id="home" className="d-flex">
                <div className="container align-self-center">
                    <div className="row">
                        <div className="col-md-12">

                            <div id="area-principal">

                                <div id="area-sobrenos">

                                    <div className="postagem-sobrenos">
                                        <article id="sobrenos">
                                            <h2 className="titulosecundario">Contato!</h2>
                                            <ul>
                                                <li>
                                                    <p className="paragrafo">Telefone: +55 (42)3446-1886</p>
                                                </li>
                                                <div id="emailcontato">
                                                    <li><a href="mailto:campobarba@barbearia.com.br">Email:
                                                            campobarba@barbearia.com.br</a>
                                                    </li>
                                                </div>
                                                <li>
                                                    <p className="paragrafo">Instagram: campo_barba</p>
                                                </li>
                                            </ul>
                                        </article>
                                        <span className="data-postagem"> </span>
                                        <br/>

                                        <article id="localizacao">
                                            <h2 className="titulosecundario">Marque seu Horário</h2>
                                        </article>
                                        {user ? (
                                            <div>
                                                <span className="texto-sobrenos">Preencha o formulário para estarmos entrando em
                                                contato com
                                                voce!</span>
                                                <br/>
                                                <form onSubmit={handleRegister}>
                                                    <label className="celular" for="lname"><strong>Celular:</strong></label><br/>
                                                    <input type="text" className="formulario" name="lname" placeholder="Escreva seu telefone (XX) XXXXX-XXXX" id="inputcel" value={celular} onChange={ (e) => setCelular(e.target.value)}/><br/><br/>
                                                    <label className="data" for="lname"><strong>Data:</strong></label><br/>
                                                    <input type="text" className="formulario" name="lname" placeholder="dd/mm/aaaa" id="inputdata" value={data} onChange={ (e) => setData(e.target.value)}/><br/><br/>
                                                    <label className="horario" for="lname"><strong>Horario:</strong></label><br/>
                                                    <input type="text" className="formulario" name="lname" placeholder="XX:XX" id="inputhorario" value={horario} onChange={ (e) => setHorario(e.target.value)}/><br/><br/>
                                                    <button type="submit" id="botao">Agendar</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="texto-sobrenos">Por favor, faça login para realizar um agendamento.</span>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <button type="submit" id="botao"><Link to="/login" className="link">Clique aqui para fazer login</Link></button>
                                                
                                            </div>
                                        )}
                                    </div>
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
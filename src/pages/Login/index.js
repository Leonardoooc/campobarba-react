import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import './login.css';

import { useState, useContext } from 'react'

import { AuthContext } from '../../contexts/auth'


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext)

    async function handleSignIn(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
        await signIn(email, password);
        }

    }


    return(
        <div id="wrapper">
            <Header/>
            <main>
                <section id="home" class="d-flex">
                    <div class="container align-self-center">
                        <div class="row">
                            <div class="col-md-12">

                                <div id="area-principal">
                                    <div class="postagem-sobrenos">
                                        <div class="caixa">
                                            <h2 class="titulosecundario">Login</h2>
                                            <br/>
                                            <form onSubmit={handleSignIn}>
                                                <label class="nome" for="fname"><strong>Email:</strong></label><br/>
                                                <input type="email" class="formulario" name="fname" id="email" value={email} onChange={ (e) => setEmail(e.target.value) }/><br/><br/>
                                                <label class="email" for="lname"><strong>Senha:</strong></label><br/>
                                                <input type="password" class="formulario" name="lname" id="password" value={password} onChange={ (e) => setPassword(e.target.value) }/><br/><br/>
                                                <button type="submit" id="botao">{loadingAuth ? "Carregando..." : "Entrar"}</button>
                                            </form>
                                            <br/>
                                            <br/>
                                            <nav class="align-self-center"><Link to="/cadastro" className="link">Cadastre-se</Link></nav>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <div className="fixed-bottom"><Footer/></div>
            
        </div>
    );
}
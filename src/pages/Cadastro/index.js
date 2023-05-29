import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AuthContext } from '../../contexts/auth'
import { useState, useContext  } from 'react'

import './cadastro.css';


export default function Cadastro() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSubmit(e){
        e.preventDefault();

        if(name !== '' && email !== '' && password !== ''){
        await signUp(email, password, name)
        }

    }
    
    return(
        <div id="wrapper">
        <Header/>
        <main>
        <section id="home" className="d-flex">
            <div className="container align-self-center">
                <div className="row">
                    <div className="col-md-12">

                        <div id="area-principal">
                            <div className="postagem-sobrenos">
                                <div className="caixa">
                                    <h2 className="titulosecundario">Cadastre-se!</h2>
                                    <br/>
                                    <form onSubmit={handleSubmit}>
                                        <label className="nome" for="fname"><strong>Nome:</strong></label><br/>
                                        <input type="name" className="formulario" name="fname" id="nome" value={name} onChange={ (e) => setName(e.target.value) }/><br/><br/>
                                        <label className="email" for="lname"><strong>Email:</strong></label><br/>
                                        <input type="email" className="formulario" name="lname" id="email" value={email} onChange={ (e) => setEmail(e.target.value) }/><br/><br/>
                                        <label className="email" for="lname"><strong>Senha:</strong></label><br/>
                                        <input type="password" className="formulario" name="lname" id="password" value={password} onChange={ (e) => setPassword(e.target.value) }/><br/><br/>
                                        <button type="submit" id="botao">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
                                    </form>
                                    <br/>
                                    <br/>
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
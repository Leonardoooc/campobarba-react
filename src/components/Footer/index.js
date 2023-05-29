import { Link } from 'react-router-dom';
import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../contexts/auth'
import { useState, useContext  } from 'react'

export default function Footer() {
    const { user, logout } = useContext(AuthContext);
    return(
        <div>
        <footer>
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <img src={require('../../images/logo.png')} width="90"/>
                </div>
                <div className="col-md-2">
                    <h4>Campo Barba</h4>
                    <ul className="navbar-nav">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                        <li><Link to="/cadastro">Cadastro</Link></li>
                        <li><Link to="/sobre">Sobre Nós</Link></li>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h4>Termos</h4>
                    <ul className="navbar-nav">
                        <li><Link to="/">Termos de Serviço</Link></li>
                        <li><Link to="/">Termos de Uso</Link></li>
                        <li><Link to="/">Cookies</Link></li>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h4>links uteis</h4>
                    <ul className="navbar-nav">
                        <li><Link to="/">Sobre o site</Link></li>
                        <li><Link to="/">Links</Link></li>
                        {user && (
                            <li><Link to="/" onClick={() => logout()}>Sair</Link></li>
                        )}
                        {user && (
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        )}
                    </ul>
                </div>
                <div className="col-md-4">
                    <ul>
                        <li>
                            <a href=""><img src={require('../../images/facebook.png')}/></a>
                        </li>
                        <li>
                            <a href=""><img src={require('../../images/twitter.png')}/></a>
                        </li>
                        <li>
                            <a href=""><img src={require('../../images/instagram.png')}/></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    </div>
    );
}
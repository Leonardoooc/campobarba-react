import { Link } from 'react-router-dom';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import { useState, useContext  } from 'react'

export default function Header() {
    const { user, logout } = useContext(AuthContext);
    return(
        <header>
        <nav className="navbar navbar-expand-md navbar-light navbar-transparente">
            <div className="container">
                
                <Link to="/" className='navbar-brand'>
                    <img src={require('../../images/logo.png')} width="60px"/>
                </Link>

                <div className="collapse navbar-collapse" id="nav-principal">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/" className='nav-link'>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contato" className='nav-link'>
                                Contato
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sobre" className='nav-link'>
                                Sobre
                            </Link>
                        </li>
                        {user ? (
                        <li className="nav-item">
                            <Link to="/dashboard" className='nav-link'>
                            Dashboard
                            </Link>
                        </li>
                        ) : (
                        <li className="nav-item">
                            <Link to="/login" className='nav-link'>
                            Login
                            </Link>
                        </li>
                        )}
                        {user && (
                        <li className="nav-item">
                            <Link className='nav-link' onClick={() => logout()}>Sair</Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
        </header>
    );
}
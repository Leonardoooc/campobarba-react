import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import './sobre.css';


export default function Contato() {

    return(
        <div id="wrapper">
            <Header/>
            <main>
        <section id="home" className="d-flex">
            <div className="container align-self-center">
                <div className="row">
                    <div className="col-md-12">

                        <div id="area-principal">

                            <div id="area-sobrenos">

                                <div className="postagem-sobrenos">
                                    <article id="sobrenos">
                                        <h2 className="titulosecundario">Sobre Nós!</h2>
                                        <p className="paragrafo">A Campo Barba é a barbearia da sua época. Focada em
                                            excelência, a Barbearia
                                            conta com tudo
                                            que o homem moderno precisa. Um ambiente confortável e descontraído, com
                                            cuidados para todos os estilos de barba e cabelo, além de serviços como
                                            massagem, podologia,
                                            estética masculina, feminina e dia do noivo. Uma barbearia premium, para
                                            cuidar do visual,
                                            tomar uma
                                            cerveja
                                            gelada, assistir aos seus esportes favoritos ou jogar uma partida de sinuca.
                                        </p>
                                    </article>
                                    <span className="data-postagem"> </span>
                                    <br/>
                                    <article id="localizacao">
                                        <h2 className="titulosecundario">Onde Estamos?</h2>
                                            <span className="texto-sobrenos">R. Comendador Norberto, 1299 - Santa Cruz,
                                                Guarapuava - PR,
                                                85015-240</span>
                                            <br/>
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.0245640854664!2d-51.47314628445841!3d-25.403988338088233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ef462cdc2f72fb%3A0xbe73a2c1e8973c98!2sCentro%20Universit%C3%A1rio%20Campo%20Real!5e0!3m2!1spt-BR!2sbr!4v1662506570290!5m2!1spt-BR!2sbr"
                                                width="620" height="340" allowfullscreen=""
                                                loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </article>

                                    <span className="data-postagem"> </span>

                                    <article id="localizacao">
                                        <h2 className="titulosecundario">Conheça nosso Estabelecimento!</h2>
                                            <br/>
                                            <iframe width="620" height="340" src="https://www.youtube.com/embed/QLaX3_03Osk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </article>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                </div>
        </section>
    </main>
            <Footer/>
        </div>
    );
}
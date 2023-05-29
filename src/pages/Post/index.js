import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import './post.css';

import { FiSettings, FiUpload } from 'react-icons/fi'
import {AuthContext} from '../../contexts/auth'

import { db, storage } from '../../services/firebaseConnection'
import {collection, getDocs, getDoc, doc, addDoc, updateDoc} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { toast } from 'react-toastify'

import { useState, useContext } from 'react'

export default function Post() {
    const { user, storageUser, setUser, logout } = useContext(AuthContext);

    const [postUrl, setPostUrl] = useState(null)
    const [imagePost, setImagePost] = useState(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');

    function handleFile(e){
        if(e.target.files[0]){
          const image = e.target.files[0];
    
          if(image.type === 'image/jpeg' || image.type === 'image/png'){
            setImagePost(image)
            setPostUrl(URL.createObjectURL(image))
          } else {
            alert("Envie uma imagem do tipo PNG ou JPEG")
            setImagePost(null);
            return;
          }    
        }
    }

    async function handleUpload(e){
        e.preventDefault();

        if(imagePost === null) {
            toast.error("Você precisa colocar uma imagem no post.")
            return;
        }

        if (title === '') {
            toast.error("Você precisa adicionar um título.")
            return;
        }

        if (subtitle === '') {
            toast.error("Você precisa adicionar um subtítulo.")
            return;
        }

        if (description === '') {
            toast.error("Você precisa adicionar uma descrição.")
            return;
        }
    
        const uploadRef = ref(storage, `images/posts/${imagePost.name}`)
    
        const uploadTask = uploadBytes(uploadRef, imagePost)
        .then((snapshot) =>{
          
          getDownloadURL(snapshot.ref).then( async (downloadURL) => {
            let urlFoto = downloadURL;
    
            await addDoc(collection(db, "posts"), {
                postUrl: urlFoto,
                title: title,
                subtitle: subtitle,
                description: description,
                created: new Date(),
            })
            .then(() => {
                setDescription('');
                setTitle('')
                setSubtitle('')
                toast.success("Post enviado com sucesso!")
            })
            .catch((error) => {
                toast.error("Erro ao enviar post!")
                console.log(error);
            })
    
          })
    
        })
    
    }

    return(
        <div id="wrapper">
            <Header/>

            <div id="area-principal">
            <div id="area-sobrenos">
            <div className="postagem-sobrenos">
            <form onSubmit={handleUpload}>
                <label className="postImage">
                <label className="celular" for="lname"><strong>Imagem:</strong></label><br/>
                
                    <span>
                    <FiUpload color="#FFF" size={25} />
                    </span>
                    <br/>

                    <input type="file" accept="image/*" onChange={handleFile}  /> <br/>
                    {postUrl === null ? (
                    <img className="img-fluid" src={require('../../images/logo.png')} alt="Foto da publicação" width={300} height={250}/>
                    ) : (
                    <img className="img-fluid" src={postUrl} alt="Foto da publicação" width={300} height={250}/>
                    )}

                </label>
                <br/>
                <br/>
                <br/>
                <br/>
                <label className="celular" for="lname"><strong>Título:</strong></label><br/>
                <input type="text" className="formulario" name="lname" placeholder="Título da postagem" id="inputcel" value={title} onChange={(e) =>  setTitle(e.target.value)}/><br/><br/>
                <label className="data" for="lname" style={{marginLeft: '34px'}}><strong>Subtítulo:</strong></label><br/>
                <input type="text" className="formulario" name="lname" placeholder="Subtítulo da postagem" id="inputdata" value={subtitle} onChange={(e) =>  setSubtitle(e.target.value)}/><br/><br/>
                <label className="horario" for="lname" style={{marginLeft: '23px'}}><strong>Descrição:</strong></label><br/>
                <input type="text" className="formulario" name="lname" placeholder="Descrição da postagem" id="inputhorario" value={description} onChange={(e) =>  setDescription(e.target.value)}/><br/><br/>
                <button type="submit" id="botao">Postar</button>
            </form>
            </div>
            </div>
            </div>
        <Footer/>
        </div>
    );
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import styles from "./CreatePost.module.css"
import GrowExample from "../../bootstrap/config"
import { useInsertDocument } from "../../hooks/useInsertDocuments"


const CreatePost = () => {

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const {user} = useAuthValue()


  const {insertDocument, response} = useInsertDocument("posts");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")
    
    //validando a url
    try {
      new URL(image)
    } catch (error) {
      setFormError("a imagem precisa ser uma url")
    }

    //criando o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())


    //checar todos os valores
    if(!title || !image || !tags || !body) {
      setFormError("Preencha todos os campos")
    }


    if (formError) return

  

    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName, //atenta ao createD
    })
   

    //redirect to home page
    navigate("/")

    
    
  }



  return (
    <div className={styles.create_post}>
        <h2>Criar Post</h2>  
        <p>Escreva sobre o que quiser e compartilhe !</p>
        <form onSubmit={handleSubmit}>
            <label>
              <span>Titulo:</span>
              <input type="text" 
              name="title" 
              required 
              placeholder="Pense num bom titulo..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input type="text" 
              name="image" 
              required 
              placeholder="insira uma imagem"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              />
            </label> 
            <label>
              <span>Conteúdo:</span>
              <textarea 
              name="body" 
              required 
              placeholder="insira o conteudo do post" 
              onChange={(e) => setBody(e.target.value)}
              value={body}>
              </textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input type="text" 
              name="tags" 
              required 
              placeholder="insira as tags separadas por virgula"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              />
            </label> 
       
          { !response.loading && <button className="btn"> Cadastrar </button>}
          { response.loading && <button className="btn" disabled> Aguarde... <GrowExample/></button>}

          {response.error && <p className="error">{response.error} </p>} 
          {formError && <p className="error">{formError} </p>} 

        </form>
    </div>
  )
}

export default CreatePost
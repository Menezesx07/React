import styles from "./Login.module.css"

import { useEffect, useState } from "react"
import { useAuthentication } from "../../hooks/useAuthentication"
import GrowExample from "../../bootstrap/config"



const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  //login é a função completa que faz o login do usuario 
  const {login, error: authError, loading} = useAuthentication();


  //e.target.value captura dos valores do campo com o onSubmit={handleSubmit}
  const handleSubmit = async (e) => {
    e.preventDefault();

    //zerando os possiveis erros das tentativas de 
    //submissoes anteriores (ex: senha diferente na confirmação)
    setError("")

    //montando o json
    //atentar ao nome do objeto, ele é case sensitive
    const user = {
      email,
      password
    }

    const res = await login(user)

    console.log(res)


  }

  //vendo se o authError passado como parametro pelo retorno do useAuthentication foi alterado
  //se sim, ele seta o Error daqui do register e passando a variavel que foi alterada como 
  //parametro, e sendo assim, o Error é exibido como um pop-up
  //lembrando que, por conta do if, se for alterado para null, não é exibido nada
  useEffect(() => {

    if(authError) {
      setError(authError)
    }

  }, [authError])

  return (

    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça o Login Para Utilizar o Sistema</p>
    
    <form onSubmit={handleSubmit}>

    <label>
      <span>Email:</span>
      <input type="text" 
      name="displayName"
      placeholder="Email do usuário"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)} />
    </label>

    <label>
      <span>Senha:</span>
      <input type="password" 
      name="displayName"
      placeholder="Insira sua senha"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)} />
    </label>


    {/* pegando o loading do retorno do hook da autenticação */}
    {!loading && <button className="btn"> Logar </button>}
    {loading && <button className="btn" disabled> Aguarde... <GrowExample/></button>}

    {error && <p className="error">{error} </p>}
    

  </form>
    </div>
    
  )
}

export default Login
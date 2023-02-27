import styles from "./Register.module.css"



import { useEffect, useState } from "react"
import { useAuthentication } from "../../hooks/useAuthentication"
import GrowExample from "../../bootstrap/config"




const Register = () => {

  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  //createUser é a função completa, que retorna o USER do useAuthentication
  //renomeando o error passado como parametro para authError
  const {createUser, error: authError, loading} = useAuthentication();


  //e.target.value captura dos valores do campo com o onSubmit={handleSubmit}
  const handleSubmit = async (e) => {
    e.preventDefault();

    //zerando os possiveis erros das tentativas de 
    //submissoes anteriores (ex: senha diferente na confirmação)
    setError("")

    //montando o json
    //atentar ao nome do objeto, ele é case sensitive
    const user = {
      displayName,
      email,
      password
    }

    //vendo se as senhas digitadas são iguais
    if(password !== confirmPassword) {
      setError("As senhas precisam ser iguais!")
      return
    }

    console.log(user)

    //chamando a função do useAthentication e passando o usuario digitado 
    //como parametro (não confundir o user que foi digitado com o user do retorno 
    //do useAuthentication)
    const res = await createUser(user)

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
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas historias</p>

        <form onSubmit={handleSubmit}>

          <label>
            <span>Nome:</span>
            <input type="text" 
            name="displayName"
            placeholder="Nome do usuário"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)} />
          </label>

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

          <label>
            <span>Confirmação de Senha:</span>
            <input type="password" 
            name="displayName"
            placeholder="Confirme a sua senha"
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>

          {/* pegando o loading do retorno do hook da autenticação */}
          {!loading && <button className="btn"> Cadastrar </button>}
          {loading && <button className="btn" disabled> Aguarde... <GrowExample/></button>}

          {error && <p className="error">{error} </p>}
          

        </form>
    </div>
  )
}

export default Register
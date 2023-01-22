import "./StartScreen.css"

import {backLogo} from "../."

//recebendo startGame como parametro (função)
const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <div>
            <img src="/backLogo.png" alt="logo" />
        </div>
        <h3>Clique Para Começar a Jogar</h3>
        {/* passando a função recebida no props, aqui*/}
        <button onClick={startGame}>Começar o Jogo</button>
    </div>
  )
}

export default StartScreen
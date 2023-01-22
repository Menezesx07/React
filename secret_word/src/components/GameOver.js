import React from 'react'

import "./GameOver.css"

const GameOver = ({retry, score}) => {
  return (
    <div>
        <h1>Fim de Game</h1>
        <h2>Sua Pontuação Foi : <span>{score}</span></h2>
        <button onClick={retry}>Resetar o jogo</button>
    </div>
  )
}

export default GameOver
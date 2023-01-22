import "./Game.css"

import { useState, useRef } from "react";

const Game = ({verifyLetter, 
  pickedWord, 
  pickedCategory, 
  letters, 
  guessedLetters, 
  wrongLetters, 
  guesses, 
  score}) => {


  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    //jogando a letra para verificação no app.js
    verifyLetter(letter);
    setLetter("")

    //focar no input
    letterInputRef.current.focus();
  }

  return (
    <div className="game">

        <p className="points">
            <span>Pontuação: {score}</span>
        </p>

        <h1>Advinhe a palavra</h1>

        <h3 className="tip">
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>

        <p>Você ainda tem {guesses} tentativas</p>

        {/* pra cada letra da palavra, inicialmente ele imprime um quadrado branco*/}
        {/* pra cada letra no guessedLetters (função no app.js #001) ele faz essa validação de if else do jsx*/}
        <div className="wordContainer">
            {letters.map((letter, i) => 
                guessedLetters.includes(letter) ? (
                  <span key={i} className="letter">{letter}</span>
                ) : (
                  <span key={i} className="blankSquare"></span>
                )
           )}
         </div>

        <div className="letterContainer">
             <p>Tente adivinhar uma letra:</p>
             <form onSubmit={handleSubmit}>
                <input type="text" 
                name="letter" 
                maxLength="1" 
                required onChange={(e) => setLetter(e.target.value)}
                value={letter}
                ref={letterInputRef}
                />
                <button>Jogar!</button>
             </form>
        </div>
        
        <div className="wrongLettersContainer">

        {/* se a letra cair no wrongLetter (função no app.js #001) ela vai ser exibida */}
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
        
      </div>
       
    </div>
  )
}

export default Game
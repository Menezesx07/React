import './App.css';

import { useCallback, useEffect, useState } from 'react';

//lista de palavras
import {wordsList} from "./data/words"

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';


//dependendo do name: ele vai renderizar com componente na tela (ao inves de usar true e false)
//que vai ser setado num array stages[x].name
const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
  
]

function App() {

  //iniciando o jogo no start (array stages)
  const [gameStage, setGameStage] = useState(stages[0].name) 

  //criando um objeto baseado no wordList com todas as palavras (words.js)
  const [words] = useState(wordsList)

  //setando a palavra sorteada
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  //letras adivinhadas
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0) //começa com 100 pq se deixar 0 ele fica com 200

  /* -------------------------------------------------------------------------------------------------- */

  //capturando uma categoria e palavra aleatoria, essa função é chamada na startGame
  //anotação lá em baixo 2
  const pickWordAndCategory = () => {

    //capturando uma categoria alétoria
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //capturando uma palavra da cotegoria capturada

    /*fazendo a mesma coisa da categoria, só que, acessando o array, e passando a categoria como parametro
    e depois, fazendo o .lehgt para capturar a palavra*/
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    //retornando as variaveis para ser passadas como parametro no startGame
    return {word, category}
  }

  //setando o gameStage como "game" que vem do const stages
  //iniciando o jogo
  const startGame = useCallback(() => {

    clearLetterStates();
      
    //pegar a palavra e categoria

    //recebendo word, e category do retorno da função pickWordandCategory 
    const {word, category} = pickWordAndCategory();

    //criando um array de letras
    let wordLetters = word.split("") //separando as letras com o split (word que veio do return)

    wordLetters = wordLetters.map((l) => l.toLowerCase()) //deixando em caixa baixa

    //setar os estados
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  })

  //processando a letra do input, FUNÇÃO PRIMARIA DA APLICAÇÃO
  const verifyLetter = (letter) => { //letter sem o S está no Game.js
    console.log(letter)

    const normalazidedLetter = letter.toLowerCase()

    //vendo se a letra já foi usada
    //caso o usuario já tenha digitado a letra, não acontece nada (no caso, não perde tentativa)
    if(guessedLetters.includes(normalazidedLetter) || wrongLetters.includes(normalazidedLetter)) {
      return
    } 

    //se não tiver sido utilizada, ela vai para letra acertada ou errada

    //se a palavra que estou tentando adivinhar (atentar ao letterS) #001
    if(letters.includes(normalazidedLetter)) {
        setGuessedLetters((actualGuessedLetters) => [ //atentar ao colchetes
          //capturando o array das letras acertadas com o ... e adicionando a nova letra com a ,normalazideLetter
          ...actualGuessedLetters,
          normalazidedLetter
        ])
    } else {
      setWrongLetters((actualWrongLetters) => [ //atentar ao colchetes
        //capturando o array das letras erradas com o ... e adicionando a nova letra com a ,normalazideLetter
        ...actualWrongLetters,
        normalazidedLetter
      ])

      //diminuido as tentativas, o valor passado como parametro, pode ser qualquer um, ele vai interpretar como o valor do guesses
      setGuesses((Guesses) => Guesses -1)

    }

  }

  //zerando as letras acertadas e erradas
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //checkar a condição de vitoria
  useEffect(() => {

    /*transformando as letras da palavra em um array de letras unicas, exemplo:
    "casa", ele transforma em "cas" pois não precisa repetir os 2 "a"*/

    const uniqueLetters = [...new Set(letters)]
    
    //condição de vitoria
    //se o array de letras unicas tiver o mesmo tamanho do de letras acertadas, é win
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
        //adicionando potuação
        setScore((score) => score += 100)

        //reiniciando o jogo
        startGame();
    }

  }, [guessedLetters, letters, startGame])


  //useEffect para monitorar o guesses (tentativas) a cada vez que é alterado (quando a pessoa erra)
  useEffect(() => {
    if(guesses <= 0) {

      //resetando todos os estados
      clearLetterStates();

      setGameStage(stages[2].name)

    }
  }, [guesses])


  //reiniciar o jogo
  const retry = () => {
    setScore(0)
    setGuesses(3)

    setGameStage(stages[0].name)
  }

  /* -------------------------------------------------------------------------------------------------- */
  return (
    <div className="App">                    {/*anotação no final 1 */}
      {gameStage === "start" && <StartScreen startGame={startGame}/>} {/* && no jsx é if*/}

      {gameStage === "game" && <Game 
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory} 
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />}

      {gameStage === "end" && <GameOver retry={retry} score={score}/>}

    </div>
  );
}

export default App;



/* 1 - passando a função startGame via props no <StartScreen startGame={startGame}/>
    nesse caso, startGame= é o nome da variavel, tipo o do json, com o startgame=
    sendo um objeto, já o  {startGame} é o parametro*/

/* const categories = Object.keys(words) - pega todas as chaves do words.js (dentro da pasta data)
e salva na constante "categories"

categories[Math.floor(Math.random() * Object.keys(categories).length)] - category é uma constante
que vai receber um valor aleatorio das chaves que tem em categories, essa chave vai ser definida com o 
math.floor, que gera um numero aleatorio baseado na quantidade de chaves que tem nesse array do categories
por isso é usado o .leght, o Math.floor, é usado pois só o random, gera um numero quebrado, quando usa o 
floor, ele arredonda esse numero para baixo*/
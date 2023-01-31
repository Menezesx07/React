import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

//3 - alterando o valor

const ChangeCounter = () => {

    const {counter, setCounter} = useContext(CounterContext)

  return (
    <div>
        <button onClick={() => setCounter(counter - 1)}>-</button>
        <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  )
}

export default ChangeCounter
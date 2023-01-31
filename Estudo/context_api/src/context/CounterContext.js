// 1 - criando contexto
import { createContext, useState } from "react";

export const CounterContext = createContext()


//2 - criar provider (tem codigo no ined.js)
export const CounterContextProvider = ({children}) => {

    const [counter, setCounter] = useState(5)

    return (
        <CounterContext.Provider value={{counter, setCounter}}>
            {children}
        </CounterContext.Provider>
    )

}


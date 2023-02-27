import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";

const initialState = {
    loading: null,
    error: null
}

//chamando o vazamento de dados pt-3
//tratando os erros, baseado no que eu escrever no TYPE: ""
const insertReducer = (state, action) => {
    switch (action.type) {
      case "LOADING":
        return { loading: true, error: null };
      case "INSERTED_DOC":
        return { loading: false, error: null };
      case "ERROR":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const useInsertDocument = (docCollection) => {

  
    const [response, dispatch] = useReducer(insertReducer, initialState)

    //deal with memory leak
    const [cancelled, setCacelled] = useState(false)


    //conferindo vazamento de memoria
    //chamando o vazamento de dados pt-2
    //passando a ação, que no caso é o post do usuario
    const checkCancelBeforeDispatch = (action) => {


    //  checkCancelBeforeDispatch({type: "LOADING"});

        //se o cancelamento for false, ele dispara
        //se o cancelamento for true, tem dados na memoria
        //o dispatch tem como parametro a função inserReducer, que tá lá em cima
        if(!cancelled) {
            dispatch(action)
        }
    }

    //document é o "post" que o usuario fez
    const insertDocument = async(document) => {

      

        try {


            //adicionando a data atual no post
            const newDocument = {...document, createAt: Timestamp.now()}

            //inserindo os dados no banco de dados, no caso, o firebase não usa tabelas
            //mas collections, nesse caso, é passado as credenciais do db, a biblioteca e
            //o arquivo gerado já com a data
            const insertedDocument = await addDoc(
                collection(db, docCollection), 
                newDocument
            )



            checkCancelBeforeDispatch({
              type: "INSERTED_DOC",
              payload: insertedDocument,
            });

       
        } catch (e) {

          console.log(e)

          checkCancelBeforeDispatch({
            type: "ERROR",
            payload: e.message
          })

        }

    }

    useEffect(() => {
      return () => setCacelled(true)
    }, []);

    //response é o state do reducer
    return {insertDocument, response}

}
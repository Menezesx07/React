import { useState, useEffect } from "react";

//4 - custom hook

//recebendo a url como parametro no app.js
export const useFetch = (url) => {

    const [data, setData] = useState(null) 

    //5 - refatorando o post
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    //6 - loading (não tá funcionado, motivo ? i dont know)
    const [loading, setLoading] = useState(false)


    //7 - tratando erros
    const [error, setError] = useState(false);

    //8 - desafio 6
    const [itemId, setItemId] = useState(null);

    /*montando o arquivo de configuração do REST para só ser escrito uma vez 
    ele recebe o data (dados capturados) e o tipo do metodo, lá do app.js */

    const httpConfig = (data, method) => {
        if(method === "POST") {
            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(data)
            })

            setMethod(method)

        } else if(method === "DELETE") {
            setConfig({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                  }
            })

            setItemId(data)
            setMethod(method)
        
        }
    }

    //metodo GET -----------------------------------------------
    useEffect(() => {

        const fetchData = async () => {

            setLoading(true)
            
            try {

            //recebendo a url como parametro lá em cima (que vem do app.js)
            const res = await fetch(url)

            //capturando só o pacote json da requisição
            const json = await res.json()

            /*seta o data, que vai ser exportado no return pro app.js,
            que nele, contém json que veio do back-end*/
            setData(json)


            setError(null);
            } catch (e) {

                //console.log(e.message)
                setError("Houve um erro ao carregar os dados!")

            }

            setLoading(false)

        
        }

        fetchData();

        /*usado a priori no metodo get, useEffect na url,
        pois sempre que tem uma alteração  no bd, ele pinga
        a url (exemplo disso é o terminal com o npm run server nele)*/

        /*callFetch vai trabalhar com o metodo post, nesse caso
        ao adicionar um item (acionado pelo enviar ao inves do ping da url)
        ele vai ser chamado */

    }, [url, callFetch])

    //5 - refatorando o post
    useEffect(() => {

        let json

        const httpRequest = async () => {

            if(method === "POST") {

            let fetchOptions = [url, config]

            const res = await fetch(...fetchOptions)

            json = await res.json()


        } else if (method === "DELETE") {

            //recebe o itemId no httpConfig com o else IF do delete, com o setId
            const deleteUrl = `${url}/${itemId}`

            const res = await fetch(deleteUrl, config)

            json = await res.json()

         
           
        }

        setCallFetch(json)
        }

        httpRequest();

    }, [config, method, url])

    /*exportando o conteudo do data (que contem o retorno do back end)
    essa função tá no useEffect que recebe o callFetch como parametro,
    já o httpConfig, é o corpo da requisição*/
    return { data, httpConfig, loading, error }

}
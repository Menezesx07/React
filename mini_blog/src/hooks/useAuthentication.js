import {db} from "../firebase/config"

import {
    getAuth, 
    createUserWithEmailAndPassword, 
    singInWithEmailAndPassword,
    updateProfile,
    singOut
} from 'firebase/auth' //pasta do firebase no node_modules


import { useEffect, useState } from 'react'


export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

   //evitando vazamento de memoria 
    const [cancelled, setCancelled] = useState(false)

    //metodo de autenticação do firebase (um token que é enviado junto com email e senha)
    const auth = getAuth()

    //função do vazamento de memoria
    //aparentemente, é como fechar a conexão com o servidor, sendo assim, se ela ainda estiver
    //aberta, caso o usuario tente fazer um novo cadastro, pode da algum problema de vazamento
    //de dados de um cadastro para o outro
    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    //função de cadastro no sistema
    const createUser = async (data) => {

        //anotação na declaração da função ali em cima
        checkIfIsCancelled()

        //setando o loagind para cololar uma mensagem de carregamento
        setLoading(true)
        setError(null)


        try {
            //mandando o email e senha que vão ser cadastrados 
            //atrvés dessa função com o noem grande ai
            const {user} = await createUserWithEmailAndPassword(

                //objeto que recebe os tokens de validação do firebase 
                auth, 

                //email e senha que o usuario digitou
                data.email,
                data.password 
            )

                //dando certo, é preciso enviar também o nome que o usuario escolheu
                //mas só da pra fazer isso depois que ele for registrado, e posteriormente
                //atualizando o perfil (firebase requer isso)
                await updateProfile(user, { //passado o usuario (email, senha e auth) e atualizando com o json
                    
                    displayName: data.displayName //displayname é o nome que o usuario digitou no cadastro
                })

                 //desligando a animação de loading
                 setLoading(false)

                //retornando o usuario que foi criado
                return user

        } catch (e) { //trycath padrão

            console.log(e.message)
            console.log(typeof e.message)

            let systemErrorMessage

            //includes consegue capturar só um pedaço do texto passado como parametro
            if(e.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if(e.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
            }

            //setando o error com esse if else,e passado como parametro pro register.js no retorno
            setError(systemErrorMessage)

             //desligando a animação de loading
             setLoading(false)

        }

       

    }

    //aparentemente, é como fechar a conexão com o servidor, sendo assim, se ela ainda estiver
    //aberta, caso o usuario tente fazer um novo cadastro, pode da algum problema de vazamento
    //de dados de um cadastro para o outro
    useEffect(() => {
        return () => setCancelled(true)
    }, [])


    //exportando as variaveis para serem usadas em outras funções 
    return {
        auth,
        createUser,
        error,
        loading
    }
}

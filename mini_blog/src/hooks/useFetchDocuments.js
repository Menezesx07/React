import { async } from "@firebase/util";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFetchDocuments = (docCollection, search = null, uid = null) =>  {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //deal with memory leak
    const [cancelled, setCacelled] = useState(false)

    useEffect(() => {

        async function loadData() {
            if(cancelled) return

            setLoading(true)
            
            const collectionRef = await collection(db, docCollection)

            try {

                let q 

                //busca
                //dashboard

                q = await query(collectionRef, orderBy("createdAt", "desc"))

            } catch (e) {

            }
        }

    }, [docCollection, search, uid, cancelled])

}
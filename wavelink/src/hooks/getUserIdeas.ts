import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { orderBy } from "firebase/firestore";


export interface Idea {
    id: string;
    title: string;
    username: string;
    description: string;
    projects: string;
}

const filterIdeasByUsername = (username: string) => {

    const [ideaList, setIdeaList]: any[] = useState([])
    const ideasCollectionRef = collection(db, "ideas")
    
    

    useEffect(() => {
        const getIdeaList = async () => {
        try {
            const data = await getDocs(query(ideasCollectionRef, where('username', '==', username)))
            const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id,
            }));
            setIdeaList(filteredData);
        } catch (err) {
            console.error(err)
        }
        
        }
        getIdeaList();
    }, [])

    return (
        {ideaList}
    )

    
}

export default filterIdeasByUsername;
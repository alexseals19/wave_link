import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { collection, getDocs,query } from "firebase/firestore";
import { db } from "../config/firebase";
import { orderBy } from "firebase/firestore";

export interface Idea {
    id: string
    title: string;
    user: string;
    description: string;
    projects: string;
}


const useIdeas = () => {

    const [ideasList, setIdeasList]: any[] = useState([])
    const ideasCollectionRef = collection(db, "ideas")
    
    

    useEffect(() => {
        const getIdeasList = async () => {
        try {
            const data = await getDocs(query(ideasCollectionRef, orderBy('date', 'desc')))
            const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id,
            }));
            setIdeasList(filteredData);
        } catch (err) {
            console.error(err)
        }
        
        }
        getIdeasList();
    }, [])

    return (
        {ideasList}
    )

    
}

export default useIdeas;
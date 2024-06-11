import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { collection, getDocs,query } from "firebase/firestore";
import { db } from "../config/firebase";
import { orderBy } from "firebase/firestore";

export interface Idea {
    projects: any;
    id: number;
    title: string;
    username: string;
    description: string
}


const getAllIdeas = () => {

    const [ideaList, setIdeaList]: any[] = useState([])
    const ideasCollectionRef = collection(db, "ideas")
    
    

    useEffect(() => {
        const getIdeaList = async () => {
        try {
            const data = await getDocs(query(ideasCollectionRef, orderBy('date', 'desc')))
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

export default getAllIdeas;
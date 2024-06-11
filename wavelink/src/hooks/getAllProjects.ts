import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { collection, getDocs,query } from "firebase/firestore";
import { db } from "../config/firebase";
import { orderBy } from "firebase/firestore";

export interface Project {
    id: number;
    title: string;
    username: string;
    imageurl: string;
    imageurls: [];
}


const getAllProjects = () => {

    const [projectList, setProjectList]: any[] = useState([])
    const projectsCollectionRef = collection(db, "projects")
    
    

    useEffect(() => {
        const getProjectList = async () => {
        try {
            const data = await getDocs(query(projectsCollectionRef, orderBy('date', 'desc')))
            const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id,
            }));
            setProjectList(filteredData);
        } catch (err) {
            console.error(err)
        }
        
        }
        getProjectList();
    }, [])

    return (
        {projectList}
    )

    
}

export default getAllProjects;
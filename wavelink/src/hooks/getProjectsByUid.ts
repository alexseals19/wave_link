import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { orderBy } from "firebase/firestore";
import getUserByUid from "./getUserByUid";


export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Project {
    id: number;
    title: string;
    username: string;
    imageurl: string;
}

const getProjectsByUid = () => {

    const [projectList, setProjectList]: any[] = useState([])
    const projectsCollectionRef = collection(db, "projects")
    

    useEffect(() => {
        const getProjectList = async () => {
        try {
            
            const data = await getDocs(query(projectsCollectionRef, where('user', '==', auth.currentUser!.uid)))
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

export default getProjectsByUid;
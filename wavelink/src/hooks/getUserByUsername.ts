import {  collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { useState } from "react";

const getUserByUsername = async (username: string) => {
   
    const ideasCollectionRef = collection(db, "users")

    const [user, setUser] = useState<any>({})
    
    try {
        const data = await getDocs(query(ideasCollectionRef, where('username', '==', username )))
        
        data.forEach((doc) => {
            setUser(doc.data())
        })
        
    
    
    return (
        user
    )
    } catch {
        
    }
    
}

export default getUserByUsername;
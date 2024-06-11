import {  collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { useState } from "react";

const getUserByUid = async () => {

    const ideasCollectionRef = collection(db, "users")

    if (!auth.currentUser) return;
    const [user, setUser] = useState<any>({})
    
    try {
        const data = await getDocs(query(ideasCollectionRef, where('uid', '==', auth.currentUser!.uid )))
        
        data.forEach((doc) => {
            setUser(doc.data())
        })
    
    
    return (
        user
    )
    } catch {
        
    }
    
}

export default getUserByUid;
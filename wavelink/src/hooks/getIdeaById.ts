import {  doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const getIdeaById = async (id: string) => {


    const docRef = doc(db, "ideas", id);
    try {
        const docSnap = await getDoc(docRef);
        const idea = docSnap.data();
    
    
    return (
        idea
    )
    } catch {
        
    }
    
}

export default getIdeaById;
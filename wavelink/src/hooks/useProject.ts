import {  doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const useProject = async (id: string) => {


    const docRef = doc(db, "projects", id);
    try {
        const docSnap = await getDoc(docRef);
        const project = docSnap.data();
    
    
    return (
        project
    )
    } catch {
        
    }
    
}

export default useProject;
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, db } from "../config/firebase"
import { useState } from "react"
import { googleProvider } from "../config/firebase"
import { Box, Button, Center, Image, Input, Text, VStack } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import getUser from "../hooks/getUserByUid"
import { collection, doc, updateDoc } from "firebase/firestore"
import { addDoc } from "firebase/firestore"
import logo from '../assets/wavelinkprop.webp'
import divider from '../assets/divider.webp'


export const CreateAccount = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUsername] = useState("")
    const navigate = useNavigate();
    const usersCollectionRef = collection(db, "users")
    const userImage = 'https://firebasestorage.googleapis.com/v0/b/wavelink-377.appspot.com/o/anonUser.jpeg?alt=media&token=f7489205-d9a9-48d7-ab47-02dc961159e3'

    const createUser = async () => {
        const user = await addDoc(usersCollectionRef, {uid: auth.currentUser!.uid, username: userName, userimage: userImage})
        await updateDoc(doc(db, 'users', `${user.id}`), {
            userId: user.id,
            
        });
    }

    const createAccount = async () => {
        try {
        await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err);
            
        }

        createUser();
        navigate(`/users/${userName}`);

    }

    return (
        <div>
            <Center>
                <Box bg='#2f2f2f' borderRadius={25} width = '25%'>
                    <VStack paddingY={5}>

                        <Image src ={logo} width={200}/>
                        <Image src ={divider} width = '90%' />
                        <Input placeholder="Email..." width = '70%' onChange={(e) => setEmail(e.target.value)}/>
                        <Input placeholder="Password..." width = '70%'  onChange={(e) => setPassword(e.target.value)}/>
                        <Input placeholder="Username..." width = '70%'  onChange={(e) => setUsername(e.target.value)}/>
                        
                        
                        
                            <Button bg = 'gray' onClick={createAccount}>
                                <Text fontFamily='inter'>Create Account</Text>

                            </Button>
                            
                       
                        
                    </VStack>

                </Box>

            </Center>
            
            
        </div>
    )
}
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useState } from "react"
import { googleProvider } from "../config/firebase"
import { Box, Button, Center, Image, Input, Text, VStack } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import logo from '../assets/wavelinkprop.webp'
import divider from '../assets/divider.webp'


export const Auth = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const createAccount = async () => {
        try {
        await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err);
            
        }

    }
    const signIn = async () => {
        try {
        await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err);
            alert(err)
        
        }

        navigate('/')

    }
    const signInWithGoogle = async () => {
        try {
        await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err);
        }

    }

    const logout = async () => {
        try {
        await signOut(auth)
        } catch (err) {
            console.error(err);
        }

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
                    
                        <Button bg='gray' onClick={signIn} > Sign In</Button>
                        
                        <Button bg='gray' onClick={signInWithGoogle}>Sign in with google</Button>
                        
                        
                        <Link to = '/createaccount' >
                            <Button bg = 'gray'>
                                <Text fontFamily='inter'>Create Account</Text>

                            </Button>
                            
                        </Link>
                        
                    </VStack>

                </Box>

            </Center>
            
            
            
        </div>
    )
}
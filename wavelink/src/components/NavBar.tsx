import {Box, HStack, Image, Text } from '@chakra-ui/react'
import SearchBar from './searchbar.tsx'
import "typeface-audiowide"
import userIcon from "../assets/iconTwo.png"
import { useState } from 'react'
import "@fontsource/inter"
import "@fontsource/inter/800.css"
import "@fontsource/inter/200.css"
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase.ts'
import getUserByUid from '../hooks/getUserByUid.ts'



const NavBar = () => {

    const [userName, setUsername] = useState('')
    const [userImage, setUserImage] = useState(userIcon)
    var path: string
    if (auth.currentUser) {
        getUserByUid().then((user) => {
    
            setUsername(user.username)
            setUserImage(user.userimage)
        })
        path = "/users/" + userName
    }
    else {
        path = "/login"
    }

    

    return (
        <HStack paddingRight={50} justifyContent='space-between' width = '100%'>

            <Box>
                
            

            </Box>

            
            
            <SearchBar />
            
            <Link to = {path}>
            <Box>
                <HStack>
                    
                    <Text fontFamily='inter' fontWeight='800'>{userName}</Text>
                    <Box  aspectRatio='1/1' height = '40px' overflow='hidden'  borderRadius={10} >
                        <Image src = {userImage} height = 'full' /> 
                    </Box>

                </HStack>
                
            </Box>
            </Link>

            
            
        </HStack>
        
        
    )
}

export default NavBar
import {Box,HStack, Image, Text } from '@chakra-ui/react'
import "typeface-audiowide"
import userIcon from "../assets/iconTwo.png"
import { useState } from 'react'
import "@fontsource/inter"
import "@fontsource/inter/800.css"
import "@fontsource/inter/200.css"
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase.ts'
import getUserByUid from '../hooks/getUserByUid.ts'



const MobileNavBar = () => {

    const [userName, setUsername] = useState('')
    if (auth.currentUser) {
        getUserByUid().then((user) => {
    
            setUsername(user.username)
        })
    } 
    

    return (
        <HStack paddingRight={3} justifyContent='space-between' width = '100%' paddingTop={4}>

            <Box>
                <HStack fontSize='md'>
                <Link to = '/' >
                <Text fontFamily='audiowide' color = 'orange' >projects</Text>

                </Link>
          
       
                <Text> | </Text>

                <Link to = '/ideashome' >
                    <Text fontFamily='audiowide' color = 'white'>ideas</Text>
                </Link>

                </HStack>
            

            </Box>

            
            
            
            
            
            <Box>
                <HStack>
                    
                    <Text fontFamily='inter' fontWeight='800'>{userName}</Text>
                    <Box  aspectRatio='1/1' height = '40px' overflow='hidden'  borderRadius={10} >
                        <Image src = {userIcon} height = 'full' /> 
                    </Box>

                </HStack>
                
            </Box>

            
            
        </HStack>
        
        
    )
}

export default MobileNavBar
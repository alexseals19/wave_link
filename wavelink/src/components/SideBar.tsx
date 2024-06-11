import {Box, Button, Container, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import logo from "../assets/wavelinkprop.webp"
import divider from "../assets/divider.webp"
import { Link } from 'react-router-dom'
import "@fontsource/inter"
import "@fontsource/inter/800.css"
import "@fontsource/inter/200.css"
import { useParams } from 'react-router-dom'
import { auth } from "../config/firebase"
import { useState } from 'react'
import getUserByUid from '../hooks/getUserByUid'
import Upload from './upload'

const SideBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const routeParams = useParams();

    var profileSwitch: string
    var path: string

    const [user, setUser] = useState<any>({})
    

    if (auth.currentUser) {
        getUserByUid().then((user) => {
            setUser(user)
        })
        path = '/users/' + user.username
        profileSwitch = 'Profile'
    } else {
        path = '/login'
        profileSwitch = 'Log In'
    }

    function loginSwitch() {
        if (auth.currentUser) {
            return (
                <Box>
                <Link to = {path} >
                    <Text fontFamily='inter' fontWeight = '200'  >Profile</Text>
                </Link>

                <Link to ='/auth' >
                        
                    </Link>
                    <button onClick={onOpen}>
                        <Text fontFamily='inter' fontWeight='200'>Upload</Text>
                    </button>

                    <Modal isOpen={isOpen} onClose={onClose} >
                        <ModalOverlay />
                        <ModalContent borderRadius={25} >
                        
                            <Upload />
                        
                        </ModalContent>
                    </Modal>
                </Box>

            )
            
        } else {
            return (
                
            <Link to = {path} >
                <Text fontFamily='inter' fontWeight = '200'  >Log In</Text>
            </Link>
            

            )
            
        }
    }

    return (

        
        <VStack alignItems='flex-start' paddingTop= '25px' >
            <Link to = '/'>
                <Image src = {logo} maxW = '155px' />
            </Link>
            
            <Image src = {divider} paddingTop='12px' maxW = '150px' />
            
            <Text fontFamily='inter' fontWeight='800' fontSize='xl' paddingTop = {15} >Me</Text>
            
            <Box paddingLeft={35} >
                <VStack spacing={1} align='flex-start'>
                    
                    {loginSwitch()}
                    
                    

                </VStack>
                
            </Box>
            
            
                
        </VStack>
        
        
        
    )
}

export default SideBar
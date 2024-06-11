import { Box, Button, Card, CardBody, HStack, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Modal, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { Project } from "../hooks/getAllProjects"
import CriticScore from "./CriticScore"
import image from "../assets/pluto.jpg"
import "@fontsource/inter"
import "@fontsource/inter/700.css"
import "@fontsource/inter/200.css"
import { Link } from "react-router-dom"
import ProjectPage from "./ProjectPage"
import dots from "../assets/dots.webp"
import { Idea } from "../hooks/getAllIdeas"
import divider from '../assets/divider.webp'
import { LinkIcon } from "@chakra-ui/icons"
import Upload from "./upload"
import LinkProject from "./LinkProject"

interface Props {
    idea: Idea
}

const IdeaCard = ({idea}: Props) => {
    let path = `/ideas/${idea.id}`
    let userPath =  `/users/${idea.username}`

    const { isOpen, onOpen, onClose } = useDisclosure()

    var linkText

    if (idea.projects) {
        if (idea.projects.length == 1) {
            linkText = `${idea.projects.length} project linked`
        } else {
            linkText = `${idea.projects.length} projects linked`
        }

    } else {
        linkText = '0 projects linked'
    }

    


    
    return (
    
        
        <Box bg = '#2f2f2f' borderTopRadius='25px' borderBottomRadius = {25}  border='ActiveBorder' borderColor='white' >
            <VStack align='flex-start' spacing={0} justifyContent='space-between' >
                <Link to = {path}>
                
                
                    
                    <Text fontFamily='inter' fontWeight='700' paddingX={4} paddingY={2} color = 'white' fontSize = 'xl' >
                                {idea.title}
    
                            </Text>
                </Link>

                <Box bg = '#2f2f2f' height={100} overflow='scroll'  justifyContent='end' >
                    
                    <Text fontFamily='inter' paddingX={4}  color = 'white' fontSize = 'sm' >
                                {idea.description}
    
                            </Text>
                    
                </Box>

                

                <Image src={divider} width='100%'/>

            </VStack>
            
            
            
                <HStack justifyContent='space-between' paddingX = {2} paddingRight={4} paddingBottom={1}>
                    
                    <VStack align='flex-start' paddingX = {2} paddingTop = {2} spacing = {0}>
                        
                    
                        <Link to ={userPath} >
                            <Text fontFamily= 'inter' fontSize='md' fontWeight='200'>{idea.username}</Text>

                        </Link>

                    </VStack>

                    <HStack>
                        <Text>{linkText}</Text>
                        <button onClick={onOpen}>
                            <LinkIcon />

                        </button>
                        

                    </HStack>

                    
                    
                </HStack>

                <Modal isOpen={isOpen} onClose={onClose} >
                        <ModalOverlay />
                        <ModalContent borderRadius={25} >
                        
                            {LinkProject(idea)}
                        
                        </ModalContent>
                    </Modal>
            
        </Box>
        
       
        

    )
}

export default IdeaCard
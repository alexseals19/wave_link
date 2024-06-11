import { Box, Button, Card, CardBody, Center, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { Project } from "../hooks/getAllProjects"
import CriticScore from "./CriticScore"
import image from "../assets/pluto.jpg"
import "@fontsource/inter"
import "@fontsource/inter/700.css"
import "@fontsource/inter/200.css"
import { Link } from "react-router-dom"
import ProjectPage from "./ProjectPage"
import dots from "../assets/dots.webp"
import arrowleft from '../assets/arrowLeftwebp.webp'
import arrowRight from '../assets/arrowRight.webp'
import { useState } from "react"
import divider from '../assets/divider.webp'

interface Props {
    project: Project
}

const ProjectCard = ({project}: Props) => {
    let path = `/project/${project.id}`
    let userPath =  `/users/${project.username}`

    

    const [count, setCount] = useState(0)

    function add() {
        setCount((count + 1) % project.imageurls.length);
        
    }
    function subtract() {
        if (count>0) {
            setCount(count-1)
        }
        else if(count == 0) {
            setCount(project.imageurls.length-1);
        }
        
    }
    
    return (
    
        
        <Card bg = '#161616' borderTopRadius={0} borderBottomRadius = {0} overflow='hidden' border='ActiveBorder' borderColor='white' >
            
            
            <Box pos = 'relative' borderRadius={15} bg = '#2f2f2f' aspectRatio='16/9' overflow='hidden'  justifyContent='end' paddingTop={0} borderColor='white'>
            
                <HStack paddingX={2} width = '100%' justifyContent='space-between' pos='absolute' top = '40%'>
                    <Button onClick={subtract} >
                        <Image src={arrowleft} height = {10} />
                    </Button>
                    <Button  onClick={add} >
                        <Image src={arrowRight} height = {10} />
                    </Button>

                </HStack>
                
                <Link to = {path}>
               <Image src = {project.imageurls[count]} />
               
               </Link>

            </Box>
            <Center><Image src ={divider} width='95%' paddingTop ={1}/></Center>
            
            
            
            
            <Link to = {path}>
                <HStack justifyContent='space-between' paddingX = {2} paddingRight={4} paddingBottom={1}>
                    
                    <VStack align='flex-start' paddingX = {2} spacing = {0}>
                        
                        <Text fontFamily='inter' fontWeight='700'  color = 'white' fontSize = 'l' noOfLines={1} >
                            {project.title}

                        </Text>
                    
                        <Link to ={userPath} >
                            <Text fontFamily= 'inter' fontSize='sm' fontWeight='200'>{project.username}</Text>

                        </Link>

                    </VStack>
                    
                    

                    <Image src = {dots} height={35} />
                    
                    
                </HStack>
             </Link>
             <Center><Image src ={divider} width='95%' paddingTop ={1}/></Center>
            
        </Card>
        
       
        

    )
}

export default ProjectCard
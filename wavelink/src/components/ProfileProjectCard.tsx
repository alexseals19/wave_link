import { Box, Button, Card, CardBody, Center, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { Project } from "../hooks/getAllProjects"
import CriticScore from "./CriticScore"
import image from "../assets/pluto.jpg"
import "@fontsource/inter"
import "@fontsource/inter/700.css"
import "@fontsource/inter/200.css"
import { Link } from "react-router-dom"
import ProjectPage from "./ProjectPage"
import { useState } from "react"
import arrowleft from '../assets/arrowLeftwebp.webp'
import arrowRight from '../assets/arrowRight.webp'
import divider from '../assets/divider.webp'

interface Props {
    project: Project
}

const ProfileProjectCard = ({project}: Props) => {
    let path = `/project/${project.id}`
    const [count, setCount] = useState(0);

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
    
        
        <Card bg = '#161616' borderTopRadius={0} borderBottomRadius = {0} overflow='hidden' aspectRatio='4/3' height={250}>
            
            <Box bg = '#2f2f2f' borderRadius={15} aspectRatio='16/9' overflow='hidden'  justifyContent='end'  >
                <HStack paddingX={2} width = '100%' justifyContent='space-between' pos='absolute' top = '33%'>
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
            <Heading fontFamily='inter' fontWeight='700'  color = 'white' fontSize = 'l' paddingX={2} paddingTop = '2' >
                
                    {project.title}

            </Heading>
            </Link>
                <HStack justifyContent='space-between' paddingX = {2} paddingBottom={1}>
                    
                    <Text fontFamily= 'inter' fontWeight='200'>{project.username}</Text>

                </HStack>

            <Center><Image src ={divider} width='95%' paddingTop ={1}/></Center>
            
        </Card>
        
        
        

    )
}

export default ProfileProjectCard
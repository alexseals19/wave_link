import { Box, Button, Card, CardBody, Center, HStack, Heading, Image, Text, Toast, VStack } from "@chakra-ui/react"
import { Project } from "../hooks/getAllProjects"
import CriticScore from "./CriticScore"
import image from "../assets/pluto.jpg"
import "@fontsource/inter"
import "@fontsource/inter/700.css"
import "@fontsource/inter/200.css"
import { Link, useNavigate } from "react-router-dom"
import ProjectPage from "./ProjectPage"
import dots from "../assets/dots.webp"
import arrowleft from '../assets/arrowLeftwebp.webp'
import arrowRight from '../assets/arrowRight.webp'
import { useState } from "react"
import getIdeaById from "../hooks/getIdeaById"
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import divider from '../assets/divider.webp'

interface Props {
    project: Project
}

const LinkProjectCard = (project: any, idea: any) => {
    
    let userPath =  `/users/${project.username}`

    

    const test = idea.title
    
    const linkProject = async() => {

        if (idea.projects) {
            var projectList: string[] = idea.projects
            projectList.push(project.id)
            await updateDoc(doc(db, 'ideas', `${idea.id}`), {
                projects: projectList,
                
            });
        } else {
            var projectTemp: string[] = [project.id]
            await updateDoc(doc(db, 'ideas', `${idea.id}`), {
                projects: projectTemp,
                
            });
        }

        showSuccess()
        //navigate('/refresh')
        

    }

    function showSuccess() {
        Toast({
            render: () => (
                <Box color='black' borderRadius={15} p={3} bg='white'>
                  <VStack>
                    <Text fontFamily='inter' fontSize='2xl' fontWeight='800'>Project Successfully Linked!</Text>
                  </VStack>
                </Box>
              ),
            duration: 6000,
            isClosable: true,
          })
    }

    
    return (
    
        <button onClick={linkProject} >
        <Card bg = '#2f2f2f' borderTopRadius={0} borderBottomRadius = {0} overflow='hidden' border='ActiveBorder' borderColor='white' >
            
            <Box pos = 'relative' borderRadius={15} bg = '#2f2f2f' aspectRatio='16/9' overflow='hidden'  justifyContent='end' borderColor='white'>
                
                    <Image src = {project.imageurls[0]} />
               
            </Box>
            
            
            <Center><Image src ={divider} width='90%' paddingTop ={1}/></Center>
            
                <HStack justifyContent='space-between' paddingX = {2} paddingRight={4} paddingBottom={1}>
                    
                    <VStack align='flex-start' paddingX = {2} spacing = {0}>
                        <Text fontFamily='inter' fontWeight='700'  color = 'white' fontSize = 'l' noOfLines={1} >
                            {project.title}

                        </Text>
                    
                        
                    <Text fontFamily= 'inter' fontSize='sm' fontWeight='200'>{project.username}</Text>

                        

                    </VStack>
                    
                    

                    <Image src = {dots} height={35} />
                    
                    
                </HStack>
            <Center><Image src ={divider} width='95%' paddingTop ={1}/></Center>
            
        </Card>
        </button>
        
       
        

    )
}

export default LinkProjectCard
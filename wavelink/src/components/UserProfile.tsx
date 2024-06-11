import {HStack,VStack, Grid, GridItem, Show, Button, Text, Image, Box, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverHeader, PopoverFooter, Portal, Input } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import SideBar from './SideBar.tsx'
import { auth, db, storage } from '../config/firebase.ts'
import { signOut } from 'firebase/auth'
import NavBar from './NavBar.tsx'
import filterProjects from '../hooks/userProjects.ts'
import GameCard from './ProjectCard.tsx'
import ProfileProjectCard from './ProfileProjectCard.tsx'
import arrow from '../assets/arrow.webp'
import getUser from '../hooks/getUserByUid.ts'
import test from '../assets/anonUser.jpeg'
import getUserByUsername from '../hooks/getUserByUsername.ts'
import filterProjectsByUsername from '../hooks/userProjects.ts'
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import filterIdeasByUsername from '../hooks/getUserIdeas.ts'
import IdeaCard from './IdeaCard.tsx'
import ProfileIdeaCard from './ProfileIdeaCard.tsx'
import divider from '../assets/divider.webp'

const UserProfile = () => {

    const navigate = useNavigate();
    
    const { id } = useParams();

    const {projectList} = filterProjectsByUsername(id as string);
    const {ideaList} = filterIdeasByUsername(id as string);

    const [imageUpload, setImageUpload] = useState<File | undefined>()
    const [userIcon, setUserIcon] = useState('')

    var projectPlural
    var ideaPlural

    if (projectList.length == 1) {
        projectPlural = `${projectList.length} project`
    } else {
        projectPlural = `${projectList.length} projects`
    }

    if (ideaList.length == 1) {
        ideaPlural = `${ideaList.length} idea`;
    } else {
        ideaPlural = `${ideaList.length} ideas`
    }

    const [user, setUser] = useState<any>({})
    getUserByUsername(id as string).then((user) => {
    
        setUser(user)
    })
    
    
    

    

    
    return (
        <Grid templateAreas={{
            base: `"logo nav" "user" "projects" "main" "ideas" "test" `,
            lg: `"aside nav" "aside user" "aside projects" "aside main" "aside ideas" "aside test"`
          }} bg = '#161616'>
            
            <Show below = "base">
            <GridItem area = 'logo' padding = {3}>

            </GridItem>
      
            </Show>  


        <GridItem area = 'user' paddingTop = {100} paddingLeft = {200} >
            <HStack>
            
                <Box   width = '200px' overflow='hidden' borderRadius={25}  >
                    <Image src = {user.userimage} />
                    
                </Box>
                
                <Box height='150px' paddingLeft = {5}>
                    <VStack align='flex-start'>
                        <Text fontFamily='inter' fontSize='4xl' fontWeight='800' >{user.username}</Text>
                        <HStack justifyContent='space-between'>
                            <Text fontFamily='inter' fontSize='sm' fontWeight='200' >{projectPlural}</Text>
                            <Text fontFamily='inter' fontSize='sm' fontWeight='200' >{ideaPlural}</Text>
                        </HStack>

                    </VStack>

                </Box>

                

            </HStack>
        
            <Image src={divider} width = '98%' opacity='50%' paddingTop={5} />

        </GridItem>

        <GridItem area = 'projects' paddingTop = {25} width='calc(100vw)'>
            <Text fontFamily='audiowide' fontSize='2xl'  paddingLeft = {200}>projects</Text>

        </GridItem>

        <GridItem area = 'main'>
            <HStack paddingLeft = {200} width ='calc(100vw)' paddingRight={25}>
                <HStack overflow='scroll' width = 'calc(100vw)' >
                    {projectList.map((project: any) => ( 
                        
                        <ProfileProjectCard key = {project.id} project = {project} />
                    ))}
                </HStack>
                <Image src={arrow} height='100px' paddingLeft={5} />

            </HStack>
            
        </GridItem>

        <GridItem area = 'ideas' paddingTop = {50}>
            <Text fontFamily='audiowide' fontSize='2xl'  paddingLeft = {200}>ideas</Text>

        </GridItem>
        
        <GridItem area = 'test' >
            <HStack paddingLeft = {200} width ='calc(100vw)' paddingRight={25}>
                <HStack overflow='scroll' width = 'calc(100vw)' >
                    {ideaList.map((idea: any) => ( 
                        
                        <ProfileIdeaCard key = {idea.id} idea = {idea} />
                    ))}
                </HStack>
                <Image src={arrow} height='100px' paddingLeft={5} />

            </HStack>
            
        </GridItem>

      
        <Show above = "lg">
            <GridItem area = 'aside' h = 'calc(100vh)' w = '175px' bg = '#2f2f2f' borderTopRadius='25px' borderBottomRadius='25px' position='fixed' >
                <VStack justifyContent='left'>
                  <SideBar />
      
                </VStack>
                
      
              </GridItem>
            </Show>
      
          </Grid>
        
    )
}

export default UserProfile
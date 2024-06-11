import {HStack, Image, Text, VStack, Grid, GridItem, Show, Box, Button, Center } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import useProject from '../hooks/useProject.ts'
import { useEffect, useState } from 'react'
import SideBar from './SideBar.tsx'
import arrowleft from '../assets/arrowLeftwebp.webp'
import arrowRight from '../assets/arrowRight.webp'
import getIdeaById from '../hooks/getIdeaById.ts'

const IdeaPage = () => {
    const { id } = useParams();
    
    const [idea, setIdea] = useState<any>({})
    let userPath =  `/users/${idea.username}`
    

    useEffect(() => {
         getIdeaById(id as string).then((idea) => {
            //alert(`${project.title} from page`)
            setIdea(idea);
        
            
        })

    });
    
    return (
        <Grid templateAreas={{
            base: `"logo nav" "main"`,
            lg: `"aside nav" "aside main"`
          }} bg = '#161616'>
            
            <Show below = "base">
            <GridItem area = 'logo' padding = {3}>

            </GridItem>
      
            </Show>      
            
            
            
        <GridItem area = 'main'  padding = {2} paddingLeft = {175} paddingTop = {35} >
              
            <HStack  padding = {1} paddingRight={0} >
            <Center>

            
              <VStack align = 'flex-start' spacing={0}>
                  <Text fontFamily='inter' fontWeight='800' fontSize='4xl'>{idea.title}</Text>
                  <Link to={userPath} >
                    <Text>{idea.username}</Text>

                  </Link>

                  <Text paddingTop={10} >Description:</Text>
                  <Text>{idea.description}</Text>
                  

              </VStack>
              </Center>
            
            
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

export default IdeaPage
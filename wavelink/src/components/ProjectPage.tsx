import {HStack, Image, Text, VStack, Grid, GridItem, Show, Box, Button, Center } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import useProject from '../hooks/useProject.ts'
import { useEffect, useState } from 'react'
import SideBar from './SideBar.tsx'
import arrowleft from '../assets/arrowLeftwebp.webp'
import arrowRight from '../assets/arrowRight.webp'

const ProjectPage = () => {
    const { id } = useParams();
    
    const [tests, setTests] = useState<any>({})
    const [images, setImages] = useState([])
    let userPath =  `/users/${tests.username}`
    

    useEffect(() => {
         useProject(id as string).then((project) => {
            //alert(`${project.title} from page`)
            setTests(project);
            setImages(project?.imageurls);
            
            
        })

    });
    
    const [index, setIndex] = useState(0)
    

    var imagesTest = images.map(function(image: string, index) {
        return (
            <button onClick={() => setIndex(index)}>
                <Image src={image} width = {100} />

            </button>         
            
        );
    });

    function add() {
        
            
        setIndex((index + 1) % tests.imageurls.length);
    
        
    }
    function subtract() {
        if (index>0) {
            setIndex(index-1)

        }
        if (index>0) {
            setIndex(index-1)
        }
        else if(index == 0) {
            setIndex(tests.imageurls.length-1);
        }
        
    }

    
    
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
                  <Text fontFamily='inter' fontWeight='800' fontSize='4xl'>{tests.title}</Text>
                  <Link to={userPath} >
                    <Text>{tests.username}</Text>

                  </Link>
                  
                  <Box pos='relative'  borderRadius={15} bg = '#2f2f2f' aspectRatio='5/4' width = 'calc(40vw)' overflow='hidden'  justifyContent='end' paddingTop={0} borderColor='white'>
                    <HStack paddingX={2} width = '100%' justifyContent='space-between' pos='absolute' top = '40%'>
                        <Button onClick={subtract} >
                            <Image src={arrowleft} height = {10} />
                        </Button>
                        <Button  onClick={add} >
                            <Image src={arrowRight} height = {10} />
                        </Button>

                    </HStack>

                      
                    <Image src={images[index]} width = '100%' top='50%' />
                    
                  
                      

                  </Box>

                  <HStack paddingY={5}>
                        {imagesTest}
                </HStack>

                  <Text>{tests.description}</Text>
                  

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

export default ProjectPage
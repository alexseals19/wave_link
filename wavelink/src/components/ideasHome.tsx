import { Box, Grid, GridItem, HStack, Image, Show, Text, VStack } from "@chakra-ui/react"
import NavBar from "./NavBar"
import GameGrid from "./ProjectGrid"
import SideBar from "./SideBar"
import Logo from "./Logo"
import Thumbnail from "./ProjectThumbnail"
import "typeface-audiowide"
import { useState } from "react"
import { Link } from "react-router-dom"
import IdeaGrid from "./IdeaGrid"
import MobileNavBar from "./MobileNavBar"
import getUserByUid from "../hooks/getUserByUid"
import { auth } from "../config/firebase"
import userIcon from '../assets/iconTwo.png'

function IdeasHome() {

  const [userImage, setUserImage] = useState(userIcon)
  const [userName, setUsername] = useState('')
    if (auth.currentUser) {
        getUserByUid().then((user) => {
    
            setUsername(user.username)
            setUserImage(user.userimage)
        })
    } 


  return (
    <Grid templateAreas={{
      base: `"logo" "switch" "main"`,
      md: `"logo" "main"`,
      lg: `"aside switch" "aside nav" "aside main"`
    }} bg = '#161616'>
      
      <Show below = "base">
      <GridItem area = 'logo' padding = {3}>
          <Logo/>
      </GridItem>

      </Show>    

      <Show below = "md">
      <GridItem area = 'main' height='100%'  paddingLeft = {2} paddingTop = {55} >
        <Box >
          <IdeaGrid />

        </Box>
        
        
        
      </GridItem>
      </Show> 
      
      <Show above = "lg" >
      <GridItem area = 'main' overflow='scroll' height='100%'  paddingLeft = {175} paddingTop = {50} >
        <Box >
          <IdeaGrid />

        </Box>
        
        
        
      </GridItem>

      </Show>
      
      
      <Show below = "md" >
        <GridItem area = 'nav' bg = '#161616' padding = {3}  width = '100%' position='fixed'>
        
            <HStack paddingRight={3} justifyContent='space-between' width = '100%' paddingTop={4}>

              <Box>
                  <HStack fontSize='md'>
                  <Link to = '/' >
                  <Text fontFamily='audiowide' color = 'white' >projects</Text>

                  </Link>


                  <Text> | </Text>

                  <Link to = '/ideashome' >
                      <Text fontFamily='audiowide' color = 'orange' >ideas</Text>
                  </Link>

                  </HStack>


              </Box>






              <Box>
                  <HStack>
                      
                      <Text fontFamily='inter' fontWeight='800'>{userName}</Text>
                      <Box  aspectRatio='1/1' height = '40px' overflow='hidden'  borderRadius={10} >
                          <Image src = {userImage} height = 'full' /> 
                      </Box>

                  </HStack>
                  
              </Box>



            </HStack>
          
        </GridItem>

      </Show>

      <GridItem area = 'switch' bg = '#161616' padding = {3} paddingLeft={200}  alignContent='right' width = '100%' position='fixed'>
        

        
      </GridItem>

      
      <Show above = "lg" >
        <GridItem area = 'nav' bg = '#161616' padding = {3} paddingLeft = {200}  width = '100%' position='fixed'>
          <HStack justifyContent='space-between'>
            <Box>
              <HStack>
                <Link to = '/' >
                  <Text fontFamily='audiowide' color = 'white' >projects</Text>

                </Link>
          

                <Text> | </Text>

                <Link to = '/ideashome' >
                    <Text fontFamily='audiowide' color = 'orange'>ideas</Text>
                </Link>

              </HStack>
              

            </Box>
          
          
                
            <NavBar />
          </HStack>
        </GridItem>

      </Show>
      

      <Show above = "lg" >
        <GridItem area = 'aside' borderRadius={25} h = 'calc(100vh)' w = '175px' bg = '#2f2f2f' position='fixed' >
          <VStack justifyContent='left'>
            <SideBar />

          </VStack>
          

        </GridItem>

      </Show>
        
      

      

    </Grid>
  )

}

export default IdeasHome

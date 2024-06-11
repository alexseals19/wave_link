import { Box, Grid, GridItem, HStack, Show, Text, VStack } from "@chakra-ui/react"
import NavBar from "./NavBar"
import ProjectGrid from "./ProjectGrid"
import SideBar from "./SideBar"
import Logo from "./Logo"
import "typeface-audiowide"
import MobileNavBar from "./MobileNavBar"
import { Link } from "react-router-dom"

function Home() {

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
      <GridItem area = 'main' height='100%'  paddingLeft = {2} paddingTop = {50} >
        <Box >
          <ProjectGrid />

        </Box>
        
        
        
      </GridItem>
      </Show> 
      
      <Show above = "lg" >
      <GridItem area = 'main' overflow='scroll' height='100%'  paddingLeft = {175} paddingTop = {50} >
        <Box >
          <ProjectGrid />

        </Box>
        
        
        
      </GridItem>

      </Show>
      
      
      <Show below = "md" >
        <GridItem area = 'nav' bg = '#161616' padding = {3}  width = '100%' position='fixed'>
        
          <MobileNavBar />
          
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
                  <Text fontFamily='audiowide' color = 'orange' >projects</Text>

                </Link>
          

                <Text> | </Text>

                <Link to = '/ideashome' >
                    <Text fontFamily='audiowide' color = 'white'>ideas</Text>
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

export default Home

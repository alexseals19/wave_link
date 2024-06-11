import {Box, Container, Image, Stack } from '@chakra-ui/react'
import logo from "../assets/wavelinkprop.webp"

const Thumbnail = () => {
    return (

        <Box bg = '#a4a4a4' w ='50%' h = '390px' borderRadius='15px'>
            <Image src =  {logo} width = '365px' borderRadius='15px'/>
        </Box>

    )
}

export default Thumbnail
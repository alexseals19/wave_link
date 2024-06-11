import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { collection, addDoc, setDoc, query, where, doc } from "firebase/firestore" 
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { PiArticleNyTimesDuotone } from "react-icons/pi"
import { ref, uploadBytes, getDownloadURL, getBytes } from "firebase/storage"
import { storage } from "../config/firebase"
import { v4 } from "uuid"
import { Box, Button, Center, HStack, Image, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack, useToast } from "@chakra-ui/react"
import { auth } from "../config/firebase"
import getUserByUid from "../hooks/getUserByUid"
import "@fontsource/inter"
import "@fontsource/inter/700.css"
import "@fontsource/inter/400.css"
import logo from '../assets/wavelinkprop.webp'
import divider from '../assets/divider.webp'
import { render } from "react-dom"
import arrow from '../assets/arrow.png'
import arrowleft from '../assets/arrowLeftwebp.webp'
import arrowright from '../assets/arrowRight.webp'
import { BiRotateLeft } from "react-icons/bi"


function Upload() {

    

    const toast = useToast();

    const projectsCollectionRef = collection(db, "projects")
    const ideasCollectionRef = collection(db, "ideas")
    const usersCollectionRef = collection(db, "users")
    
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const [description, setDescription] = useState("");

    
    
    
    const [newDate] = useState(Date)
    const [imageUpload, setImageUpload] = useState<any | undefined>([])
    const [images, setImages] = useState<any>([])
    
    

    var imagesTest = images.map(function(image: any) {
        return (
            
                <Image src={image} width = {100} />

            
            
    );
       });

       

    //var images = imageUrl.map(function(image: any) {
    //    return (<Image src={image} />);
    //});

    const navigate = useNavigate()

    const [userName, setUsername] = useState('')
    getUserByUid().then((user) => {
    
        setUsername(user.username)
    })

    

    function handleOnChange(event: React.FormEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement & {
            files: FileList;
        }
        setImageUpload(target.files)
        var imageUrl: string[] = []

        var testing = target.files

        for (let i = 0; i<testing.length; i++) {
            imageUrl.push(URL.createObjectURL(target.files[i]))
        }
        
        setImages(imageUrl);

        

    }
    
    function showSuccess(thisType: string) {
        toast({
            render: () => (
                <Box color='black' borderRadius={15} p={3} bg='white'>
                  <VStack>
                    <Text fontFamily='inter' fontSize='2xl' fontWeight='800'>Success!</Text>
                    <Text>{thisType} Created!</Text>
                  </VStack>
                </Box>
              ),
            duration: 6000,
            isClosable: true,
          })
    }


    const onUploadProject = async() => {
        
        if (!auth.currentUser) return;
        var user = auth.currentUser.uid
        const imageUrlList: string[] = []
        
        try {
            
            for (let i = 0; i<images.length; i++) {
                let path = imageUpload[i].name + v4()
                const imageRef = ref(storage, `test-images/${path}`);
                await uploadBytes(imageRef, imageUpload[i]).then(() => {
                    
                })

                await getDownloadURL(ref(storage, `test-images/${path}`)).then((url) => {
                    imageUrlList.push(url);
                    
                })

            }
            
            await addDoc(projectsCollectionRef, {title: newProjectTitle, date: newDate, user: user, username: userName, description: description, imageurls: imageUrlList});


            showSuccess('Project');
            navigate("/refresh");

        } catch (err) {
            
            alert(err);
        }

    }   
    const onUploadIdea = async() => {
        

        if (!auth.currentUser) return;
        var user = auth.currentUser.uid
        
        try {
                    
            await addDoc(ideasCollectionRef, {title: newProjectTitle, date: newDate, user: user, username: userName, description: description});


            showSuccess('Idea');
            navigate("/refresh");

        } catch (err) {
            
            alert(err);
        }

    }   

  return (

    <Center>
        <Box justifyContent='space-between' bg = '#2f2f2f' width = '100%' height = '90%' borderRadius={25}>
            <Image src = {logo} padding = {5} width = {250}/>
            <Image src = {divider} paddingX = {5} width = {1000}/>
        <Tabs isFitted  borderRadius={25}>
            <TabList mb='1em'>
                <Tab>Project</Tab>
                <Tab>Idea</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <p>
                        <VStack align='flex-start'>
                        <Text fontFamily='inter' fontWeight='700' >
                                Title:

                            </Text>
                            <Input placeholder="Project Title..." onChange={(e) => setNewProjectTitle(e.target.value)} />

                            <Text fontFamily='inter' fontWeight='700' paddingTop={25}>Image:</Text>
                            <input type='file' multiple onChange = {handleOnChange}/>

                            <HStack  justifyContent='space-between'>
                                <Image src={arrowleft} height={35} />
                                <HStack overflow='scroll' >
                                {imagesTest}
                                </HStack>
                                <Image src={arrowright} height={35} />

                                
                            </HStack>
                            
                            
                            
                            <Text fontFamily='inter' fontWeight='700' paddingTop={25}>Description:</Text>
                            <Textarea placeholder='Description here...' onChange={(e) => setDescription(e.target.value)} height = {250}/>
                            <Button onClick={onUploadProject} bg='blue.200'  width = '100%'> Create Project</Button>
                        </VStack>
                    </p>
                </TabPanel>
                <TabPanel>
                    <p>
                    <VStack align='flex-start'>
                        <Text fontFamily='inter' fontWeight='700' >
                                Title:

                            </Text>
                            <Input placeholder="Idea Title..." onChange={(e) => setNewProjectTitle(e.target.value)} />

                            
                            <Text fontFamily='inter' fontWeight='700' paddingTop={25}>Description:</Text>
                            <Textarea placeholder='Description here...' onChange={(e) => setDescription(e.target.value)} height = {250}/>
                            <Button onClick={onUploadIdea} bg='blue.200'  width = '100%'> Upload Idea</Button>
                        </VStack>
                    </p>
                </TabPanel>
            </TabPanels>
        </Tabs>

    </Box> 

    </Center>
    
    
  )

}
export default Upload

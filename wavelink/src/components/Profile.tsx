import {HStack,VStack, Grid, GridItem, Show, Button, Text, Image, Box } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import SideBar from './SideBar.tsx'
import { auth } from '../config/firebase.ts'
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
import CurrentUserProfile from './CurrentUserProfile.tsx'
import filterIdeasByUsername from '../hooks/getUserIdeas.ts'
import IdeaCard from './IdeaCard.tsx'
import ProfileIdeaCard from './ProfileIdeaCard.tsx'
import UserProfile from './UserProfile.tsx'

const Profile = () => {

    const navigate = useNavigate();
    
    const { id } = useParams();
    const {projectList} = filterProjectsByUsername(id as string);
    const {ideaList} = filterIdeasByUsername(id as string);

    const [user, setUser] = useState<any>({})
    getUserByUsername(id as string).then((user) => {
        
    
        setUser(user)
    })

    if (auth.currentUser) {
        if (auth.currentUser.uid == user.uid) {
            return (
                <CurrentUserProfile />
            );
        }

    
    } 
    return (
            <UserProfile />
        )

}
    
    


export default Profile
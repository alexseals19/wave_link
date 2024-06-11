
import { SimpleGrid, Text } from "@chakra-ui/react";
import getAllProjects from "../hooks/getAllProjects";
import ProjectCard from "./ProjectCard";
import getProjectsByUid from "../hooks/getProjectsByUid";
import getUserByUid from "../hooks/getUserByUid";
import { useState } from "react";
import LinkProjectCard from "./LinkProjectCard";

const LinkProjectGrid = (idea: any) => {
    

    const {projectList} = getProjectsByUid();


    return (
        <>
            
            <SimpleGrid columns = {2} spacing = {3} padding= {3} overflow='scroll'>
                {projectList.map((project: any) => ( 
                    LinkProjectCard(project, idea)
                ))}
            </SimpleGrid>
        </>
    )
}

export default LinkProjectGrid
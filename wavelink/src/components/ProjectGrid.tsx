
import { SimpleGrid, Text } from "@chakra-ui/react";
import getAllProjects from "../hooks/getAllProjects";
import ProjectCard from "./ProjectCard";

const ProjectGrid = () => {

    const {projectList} = getAllProjects();

    return (
        <>
            
            <SimpleGrid columns = {{sm: 1, md: 2, lg: 5, xl: 5}} spacing = {8} padding= '30px' overflow='scroll'>
                {projectList.map((project: any) => ( 
                    <ProjectCard key = {project.id} project = {project} />
                ))}
            </SimpleGrid>
        </>
    )
}

export default ProjectGrid
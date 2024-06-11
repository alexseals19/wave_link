
import { SimpleGrid, Text } from "@chakra-ui/react";
import getAllIdeas from "../hooks/getAllIdeas";
import IdeaCard from "./IdeaCard";

const IdeaGrid = () => {

    const {ideaList} = getAllIdeas();

    return (
        <>
            
            <SimpleGrid columns = {{sm: 1, md: 2, lg: 4, xl: 4}} spacing = {8} padding= '30px' overflow='scroll'>
                {ideaList.map((idea: any) => ( 
                    <IdeaCard key = {idea.id} idea= {idea} />
                ))}
            </SimpleGrid>
        </>
    )
}

export default IdeaGrid
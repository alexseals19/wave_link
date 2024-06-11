
import React, { useEffect } from "react";
import ProjectPage from "./components/ProjectPage";
import { Auth } from "./components/auth";
// importing components from react-router-dom package
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useParams,
} from "react-router-dom";
 
// import Home component
import Home from "./components/Home";
// import About component
import Upload from "./components/upload";
import IdeasHome from "./components/ideasHome";
import { CreateAccount } from "./components/CreateAccount";
import Profile from "./components/Profile";
import IdeaPage from "./components/IdeaPage";


function App() {

    
    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
    })

    return (
        <>

            
            {/* This is the alias of BrowserRouter i.e. Router */}
            <Router>
                <Routes>
                    {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
                    <Route
                        
                        path="/"
                        element={<Home />}
                    />
 
                    {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
                    <Route
                        path="/auth"
                        element={<Upload />}
                    />
 

                    
                    
                    <Route path="/project/:id" element={<ProjectPage />} />
                    <Route path="/ideas/:id" element={<IdeaPage />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/users/:id" element={<Profile />} />
                    <Route path="/ideashome" element={<IdeasHome />} />
                    <Route path="/createaccount" element={<CreateAccount />} />
                    
                    
                    
 
                    {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
                    {/* <Redirect to="/" /> */}
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </Router>
        </>
    );
}


  
 
export default App;
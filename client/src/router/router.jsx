import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from "../pages/Home"
import LogInPage from "../pages/login-page";
import SignUpPage from "../pages/signup-page";
import ContactUsPage from "../pages/contactUs-page";
import PageNotFound from "../pages/pagenotfound-page";
const PageRouter = () => {
  const path = ["/", "/login", "/signup", "/contact"];
  // const [currentPath , setCurrentPath] = useState(window.location.pathname);
 

  return (

    <>
    <BrowserRouter>
      { path.includes(window.location.pathname) ? <NavBar /> : null }
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LogInPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/contact" element={<ContactUsPage />}/>
            <Route path="*" element={<PageNotFound />}/>
        </Routes>
    </BrowserRouter>
    </>
  );
};

export default PageRouter;

import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import { Route, BrowserRouter, Routes ,Navigate} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails"
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId="1056747209937-7nl05kp0pbtiur7pm1qq1gvq3tvt2jha.apps.googleusercontent.com">
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />}/>
          <Route path="/posts" exact element={<Home/>}/>
          <Route path="/posts/search" exact element={<Home/>}/>
          <Route path="/posts/:id" element={<PostDetails/>}/>
          <Route path="/auth" exact element={(!user?<Auth/>:<Navigate to='/posts'/>)}/>
        </Routes>
      </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;

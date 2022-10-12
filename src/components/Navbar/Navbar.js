import React ,{useEffect, useState} from "react";
import { AppBar, Avatar, Toolbar, Typography,Button } from "@material-ui/core";
import useStyles from "./style";
import memories from "../../images/memories.png";
import {Link, useNavigate,useLocation} from 'react-router-dom';
import { useDispatch } from "react-redux";
import decode from'jwt-decode';


const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history=useNavigate();
  const location=useLocation();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    
  const logout=()=>{
    dispatch({type:'LOGOUT'})
    history('/')
    setUser(null);
  }
  
  useEffect(()=>{
    const token=user?.token;
    if(token){
      const decodedToken=decode(token);
      if(decodedToken.exp*1000 < new Date().getTime()) logout();
    }
  },[location,logout,user?.token]);

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>  
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            {
                user?(
                    <div className={classes.profile}> 
                        <Avatar  className={classes.purple} alt={user.result.name} src={user.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography variant="h6" className={classes.userName}>{user.result.name}</Typography>
                        <Button color="secondary" variant="contained" className={classes.logout} onClick={logout}>Logout</Button>

                    </div>
                ):(
                    <Button component={Link} to="/auth" color="primary" variant="contained" className={classes.logout}>Login</Button>
                )
            }
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

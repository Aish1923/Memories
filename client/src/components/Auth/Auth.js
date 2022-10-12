import React, { useState } from "react";
import useStyles from "./style";
import {
  Avatar,
  Paper,
  Typography,
  Button,
  Grid,
  Container,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import { useDispatch } from "react-redux";
import Input from "./Input";
import {useNavigate} from "react-router-dom";
import {signIn,signUp} from '../../actions/auth';
const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
  const classes = useStyles();
  const state = null;
  const history=useNavigate();
  const [formData,setformData]=useState(initialState);
  const dispatch =useDispatch();
  const [isSignup, setisSignup] = useState(true);
  const [showPassword, setshowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signUp(formData,history))
    }
    else{
      dispatch(signIn(formData,history))
    }
};
  const handleChange = (e) => {
    setformData({...formData,[e.target.name]:e.target.value});
  };
  const switchMode = () => {
    setisSignup((prev) => !prev);
    setshowPassword(false);
  };
  const handleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form
          className={`${classes.root} ${classes.form}`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={!showPassword ? "password" : "text"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <GoogleLogin
            onSuccess={async(credentialResponse) => {
              const decoded=jwt_decode(credentialResponse?.credential);
              try{
                dispatch({type:'AUTH',payload:decoded});
                history('/');
              }
              catch(error){
                console.log('error on login with google:',error)
              }
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            type="submit"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an Account? Sign In"
                : "Dont have an account?Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

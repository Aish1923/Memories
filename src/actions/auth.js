import { Action } from "@remix-run/router"
import * as api from '../api';

export const signIn=(formData,history) =>async(dispatch)=>{
    try{
        const {data} =await api.signIn(formData);

        dispatch({type:'AUTH',payload:data});
        history('/')
    }
    catch(error){
        console.log('Error while SignIn:',error)
    }

}
export const signUp=(formData,history)=>async(dispatch)=>{
    try{
        const {data}=await api.signUp(formData);
        dispatch({type:'AUTH',payload:data});
        history('/')
    }
    catch(error){
        console.log('Error while SignUP:',error)
    }

}
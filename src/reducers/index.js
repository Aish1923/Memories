import { combineReducers } from "redux";
import posts from './posts';
import auth from './auth';

//posts:posts
export default combineReducers({
    posts,
    auth
})
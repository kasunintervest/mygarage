import api from '../api';
import {userLoggedIn} from "./auth";

export const signup = (data) => dispatch =>
    api.user.signup(data).then(user =>{
        localStorage.mygarageJWT = user.user_token;
        localStorage.email = user.user_email;
        dispatch(userLoggedIn(user));
    });
import {USER_LOGGED_IN,USER_LOGGED_OUT} from '../types';
import api from '../api';

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})

export const
    login = credentials =>
        dispatch =>
            api.user.login(credentials).then(user => {
                localStorage.mygarageJWT = user.user_token;
                localStorage.email = user.user_email;
                dispatch(userLoggedIn(user))
            });

export const
    logout = () => dispatch =>{
        localStorage.removeItem('mygarageJWT');
        localStorage.removeItem('email');
        dispatch(userLoggedOut());
    };
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
                localStorage.user_id = user.id;
                localStorage.mygarageJWT = user.user_token;
                localStorage.email = user.user_email;
                localStorage.first_name = user.first_name;
                localStorage.last_name = user.last_name;
                dispatch(userLoggedIn(user))
            });

export const
    logout = () => dispatch =>{
        localStorage.removeItem('mygarageJWT');
        localStorage.removeItem('email');
        localStorage.removeItem('user_id');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        dispatch(userLoggedOut());
    };


import api from '../api';
import {userLoggedIn} from "./auth";
import {USER_UPDATED} from '../types';


const userUpdated = user => ({
    type: USER_UPDATED,
    user
});

export const signup = (data) => dispatch =>
    api.user.signup(data).then(user =>{
        localStorage.mygarageJWT = user.authentication_token;
        localStorage.user_id = user.id;
        localStorage.email = user.email;
        localStorage.first_name = user.first_name;
        localStorage.last_name = user.last_name;

        dispatch(userLoggedIn(user));
    });

export const updateUser = (id,user) => dispatch =>
    api.user
        .update(id,user)
        .then(user =>
            {
                localStorage.first_name = user.first_name;
                localStorage.last_name = user.last_name;
                dispatch(userUpdated(user));
            }
        );
import {combineReducers} from 'redux';

import user from './reducers/user';
import vehicles from './reducers/vehicles';

export default combineReducers({
    user,
    vehicles
})
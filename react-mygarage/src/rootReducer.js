import {combineReducers} from 'redux';

import user from './reducers/user';
import vehicles from './reducers/vehicles';
import service_records from './reducers/service_records'

export default combineReducers({
    user,
    vehicles,
    service_records
})
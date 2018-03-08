import {combineReducers} from 'redux';

import user from './reducers/user';
import vehicles from './reducers/vehicles';
import service_records from './reducers/service_records';
import service_companies from './reducers/service_companies';
import service_types from './reducers/service_types';

export default combineReducers({
    user,
    vehicles,
    service_records,
    service_companies,
    service_types
})
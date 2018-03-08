import {createSelector} from 'reselect';
import {SERVICE_TYPES_FETCHED} from "../types";

export default function service_types(state = {}, action = {}) {
    switch (action.type) {
        case SERVICE_TYPES_FETCHED : {
            return {...state, ...action.data.entities.service_types.undefined.service_types};
        }
        default:
            return state;
    }
}

export const serviceTypesSelector = state => state.service_types;
export const allServiceTypesSelector = createSelector(serviceTypesSelector, serviceTypeHash =>
    Object.values(serviceTypeHash)
);

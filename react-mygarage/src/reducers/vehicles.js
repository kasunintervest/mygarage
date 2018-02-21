import {createSelector} from 'reselect';
import {VEHICLES_FETCHED, VEHICLE_CREATED , VEHICLE_DELETED} from "../types";

export default function vehicles(state = {}, action = {}) {
    switch (action.type) {
        case VEHICLES_FETCHED:
            return {...state, ...action.data.entities.vehicles};
        case VEHICLE_CREATED:
            return {...state, ...action.data.entities.vehicles};
        case VEHICLE_DELETED:
            return state.filter(item => item.id !== action.id);
        default:
            return state;
    }
}


//SELECTORS
export const vehicleSelector = state => state.vehicles;
export const allVehiclesSelector = createSelector(vehicleSelector, vehicleHash =>
    Object.values(vehicleHash)
);

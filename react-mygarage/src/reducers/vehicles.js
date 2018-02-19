import {createSelector} from 'reselect';
import { VEHICLES_FETCHED, VEHICLE_CREATED } from "../types";

export default function vehicles(state = {}, action = {}) {
    switch (action.type){
        case VEHICLES_FETCHED:
        case VEHICLE_CREATED:
            return { ...state, ...action.data.entities.vehicles };
        default:
            return state;
    }
}


//SELECTORS
export const vehicleSelector = state => state.vehicles;
export const allVehiclesSelector = createSelector(vehicleSelector,vehicleHash =>
    Object.values(vehicleHash)
);
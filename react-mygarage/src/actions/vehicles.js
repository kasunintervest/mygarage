import { normalize } from "normalizr";
import { VEHICLES_FETCHED, VEHICLE_CREATED , VEHICLE_DELETED , VEHICLE_FETCHED } from "../types";
import api from "../api";
import { vehicleSchema } from "../schemas";

// data.entities.books
const vehiclesFetched = data => ({
    type: VEHICLES_FETCHED,
    data
});

const vehicleFetched = vehicle => ({
    type: VEHICLE_FETCHED,
    vehicle
});

const vehicleCreated = data => ({
    type: VEHICLE_CREATED,
    data
});

const vehicleDeleted = id => ({
    type: VEHICLE_DELETED,
    id
});

export const fetchVehicles = () => dispatch =>
    api.vehicles
        .fetchAll()
        .then(vehicles => dispatch(vehiclesFetched(normalize(vehicles, [vehicleSchema]))));

export const fetchVehicle = (id) => dispatch =>
    api.vehicles
        .fetch(id)
        .then(vehicle => dispatch(vehicleFetched(vehicle.data)));

export const createVehicle = data => dispatch =>
    api.vehicles
        .create(data)
        .then(vehicle => dispatch(
            vehicleCreated(normalize(vehicle, [vehicleSchema]))
        ));


export const deleteVehicle = (id) => dispatch => api.vehicles.delete(id).then(data => vehicleDeleted(id));

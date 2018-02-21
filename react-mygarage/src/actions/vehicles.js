import { normalize } from "normalizr";
import { VEHICLES_FETCHED, VEHICLE_CREATED , VEHICLE_DELETED , VEHICLE_FETCHED , VEHICLE_UPDATED } from "../types";
import api from "../api";
import { vehicleSchema } from "../schemas";
import vehicles from "../reducers/vehicles";

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

const vehicleUpdated = vehicle => ({
    type: VEHICLE_UPDATED,
    vehicle
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

export const updateVehicle = (id,vehicle) => dispatch =>
    api.vehicles
        .update(id,vehicle)
        .then(vehicle => dispatch(
            vehicleUpdated(vehicle)
        ));


export const deleteVehicle = (id) => dispatch => api.vehicles.delete(id).then(data => vehicleDeleted(id));

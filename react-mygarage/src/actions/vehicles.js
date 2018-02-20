import { normalize } from "normalizr";
import { VEHICLES_FETCHED, VEHICLE_CREATED } from "../types";
import api from "../api";
import { vehicleSchema } from "../schemas";

// data.entities.books
const vehiclesFetched = data => ({
    type: VEHICLES_FETCHED,
    data
});

const vehicleCreated = data => ({
    type: VEHICLE_CREATED,
    data
});

export const fetchVehicles = () => dispatch =>
    api.vehicles
        .fetchAll()
        .then(vehicles => dispatch(vehiclesFetched(normalize(vehicles, [vehicleSchema]))));

export const createVehicle = data => dispatch =>
    api.vehicles
        .create(data)
        .then(vehicle => dispatch(
            vehicleCreated(normalize(vehicle, vehicleSchema))
        ));
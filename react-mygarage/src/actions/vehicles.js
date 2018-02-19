import { normalize } from "normalizr";
import { VEHICLES_FETCHED, VEHICLE_CREATED } from "../types";
import api from "../api";
import { vehicleSchema } from "../schemas";

// data.entities.books
/*const booksFetched = data => ({
    type: VEHICLES_FETCHED,
    data
});*/

const vehicleCreated = data => ({
    type: VEHICLE_CREATED,
    data
});

/*
export const fetchBooks = () => dispatch =>
    api.books
        .fetchAll()
        .then(books => dispatch(booksFetched(normalize(books, [bookSchema]))));
*/

export const createVehicle = data => dispatch =>
    api.vehicles
        .create(data)
        .then(vehicle => dispatch(
            vehicleCreated(normalize(vehicle, vehicleSchema))
        ));
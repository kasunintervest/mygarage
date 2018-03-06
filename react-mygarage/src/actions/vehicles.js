import { normalize } from "normalizr";
import { VEHICLES_FETCHED, VEHICLE_CREATED, VEHICLE_DELETED, VEHICLE_FETCHED, VEHICLE_UPDATED, VEHICLE_SERVICE_RECORDS_FETCHED , SERVICE_COMPANIES_FETCHED } from "../types";
import api from "../api";
import { vehicleSchema , serviceRecordsSchema,serviceCompanySchema } from "../schemas";

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

const serviceRecordsFetched = data => ({
    type: VEHICLE_SERVICE_RECORDS_FETCHED,
    data
});

const serviceCompaniesFetched = data => ({
    type: SERVICE_COMPANIES_FETCHED,
    data
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

export const deleteVehicle = (id) => dispatch => api.vehicles.delete(id).then(data => dispatch(vehicleDeleted(id)));


export const fetchVehicleServiceRecords = (id) => dispatch =>
    api.service
        .fetchServiceRecords(id)
        .then(service_records => dispatch(serviceRecordsFetched(normalize(service_records, [serviceRecordsSchema]))));


export const fetchServiceCompanies = () => dispatch =>
    api.service_companies
        .fetchAll()
        .then(service_companies => dispatch(serviceCompaniesFetched(normalize(service_companies, [serviceCompanySchema]))));
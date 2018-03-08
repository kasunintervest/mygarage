import { normalize } from "normalizr";
import { VEHICLES_FETCHED, VEHICLE_CREATED, VEHICLE_DELETED, VEHICLE_FETCHED, VEHICLE_UPDATED, VEHICLE_SERVICE_RECORDS_FETCHED  ,SERVICE_RECORD_CREATED,
    VEHICLE_SERVICE_RECORD_UPDATED , VEHICLE_SERVICE_RECORD_FETCHED} from "../types";
import api from "../api";
import { vehicleSchema , serviceRecordsSchema } from "../schemas";

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

const serviceRecordCreated = data => ({
    type: SERVICE_RECORD_CREATED,
    data
});

const serviceRecordFetched = service_record => ({
    type: VEHICLE_SERVICE_RECORD_FETCHED,
    service_record
});

const serviceRecordUpdated = service_record => ({
    type: VEHICLE_SERVICE_RECORD_UPDATED,
    service_record
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

export const newServiceRecord = (id,data) => dispatch =>
    api.service.create(id,data)
        .then(service_record => dispatch(
            serviceRecordCreated(normalize(service_record, [serviceRecordsSchema]))
        ));


export const fetchServiceRecord = (id,veh_id) => dispatch =>
    api.service
        .fetchServiceRecord(id,veh_id)
        .then(service_record => dispatch(serviceRecordFetched(service_record.data)));

export const updateServiceRecord = (id,veh_id,service_record) => dispatch =>
    api.service.updateServiceRecord(id,veh_id,service_record)
        .then(service_record => dispatch(
            serviceRecordUpdated(service_record)
        ));
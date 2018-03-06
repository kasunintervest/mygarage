import { schema } from "normalizr";

export const vehicleSchema = new schema.Entity(
    "vehicles",
    {},
    { idAttribute: "_id" }
);

export const serviceRecordsSchema = new schema.Entity(
    "service_records",
    {},
    { idAttribute: "_id" }
);

export const serviceCompanySchema = new schema.Entity(
    "service_companies",
    {},
    { idAttribute: "_id" }
);
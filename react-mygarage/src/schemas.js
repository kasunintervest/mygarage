import { schema } from "normalizr";

export const vehicleSchema = new schema.Entity(
    "vehicles",
    {},
    { idAttribute: "_id" }
);
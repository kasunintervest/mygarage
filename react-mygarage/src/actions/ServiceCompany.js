import { normalize } from "normalizr";
import {  SERVICE_COMPANIES_FETCHED,SERVICE_TYPES_FETCHED } from "../types";
import api from "../api";
import { serviceCompanySchema , serviceTypesSchema } from "../schemas";


const serviceCompaniesFetched = data => ({
    type: SERVICE_COMPANIES_FETCHED,
    data
});

const serviceTypesFetched = data => ({
    type: SERVICE_TYPES_FETCHED,
    data
});

export const fetchServiceCompanies = () => dispatch =>
    api.service_companies
        .fetchAll()
        .then(service_companies => dispatch(serviceCompaniesFetched(normalize(service_companies, [serviceCompanySchema]))));

export const fetchServiceTypes = () => dispatch =>
    api.service_types
        .fetchAll()
        .then(service_types => dispatch(serviceTypesFetched(normalize(service_types, [serviceTypesSchema]))));
import {createSelector} from 'reselect';
import {SERVICE_COMPANIES_FETCHED} from "../types";

export default function service_companies(state = {}, action = {}) {
    switch (action.type) {
        case SERVICE_COMPANIES_FETCHED : {
            return {...state, ...action.data.entities.service_companies.undefined.service_companies};
        }
        default:
            return state;
    }
}

export const serviceCompanySelector = state => state.service_companies;
export const allServiceCompaniesSelector = createSelector(serviceCompanySelector, companyHash =>
    Object.values(companyHash)
);

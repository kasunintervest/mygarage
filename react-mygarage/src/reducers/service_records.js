import {createSelector} from 'reselect';
import {VEHICLE_SERVICE_RECORDS_FETCHED , VEHICLE_SERVICE_RECORD_FETCHED} from "../types";

export default function service_records(state = {}, action = {}) {
    switch (action.type) {
        case VEHICLE_SERVICE_RECORDS_FETCHED : {
            if(action.data.entities.service_records.undefined) {
                return {...state, ...action.data.entities.service_records.undefined};
            }
            return false;
        }
        case VEHICLE_SERVICE_RECORD_FETCHED: {
            return {...state, ...action.service_record}
        }
        default:
            return state;
    }
}

export const serviceSelector = state => state.service_records;
export const serviceRecordsSelector = createSelector(serviceSelector, recordHash =>
    Object.values(recordHash)
);

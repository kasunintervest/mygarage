import React from 'react';
import PropTypes from "prop-types";
import VehicleServiceRecordCard from '../Lists/VehicleServiceRecordCard';

export default function VehicleServiceRecordList({ serviceRecords }) {

    return (
        <div>
            { serviceRecords.length != 0 && serviceRecords.map(serviceRecord => serviceRecord != undefined && <VehicleServiceRecordCard vehicle={serviceRecord} key={serviceRecord.id}  />) }
            <br/>
        </div>
    );
}

VehicleServiceRecordList.propTypes = {
}
import React from 'react';
import VehicleServiceRecordCard from '../Lists/VehicleServiceRecordCard';

export default function VehicleServiceRecordList({ vehicle,serviceRecords }) {

    return (
        <div>
            { serviceRecords.length !== 0 && serviceRecords.map(serviceRecord => serviceRecord !== undefined && <VehicleServiceRecordCard vehicle={vehicle} serviceRecord={serviceRecord} key={serviceRecord.id}  />) }
            <br/>
        </div>
    );
}

VehicleServiceRecordList.propTypes = {
}
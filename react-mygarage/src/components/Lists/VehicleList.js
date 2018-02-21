import React from 'react';
import PropTypes from "prop-types";
import VehicleCard from '../Lists/VehicleCard';

export default function VehicleList({ vehicles }) {
    const emptyMessage = (
        <p>There are no vehicles yet in your collection.</p>
    );

    const vehicleList = (
        <div className="ui four cards">
            { vehicles.map(vehicle => <VehicleCard vehicle={vehicle} key={vehicle._id} />) }
        </div>
    );

    return (
        <div>
            {vehicles.length === 0 ? emptyMessage : vehicleList}
        </div>
    );
}

VehicleList.propTypes = {
    vehicles: PropTypes.array.isRequired,
}

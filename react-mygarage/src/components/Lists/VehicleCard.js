import React from 'react';
import PropTypes from "prop-types";

export default function VehicleCard({ vehicle }) {
    return (
        <div className="ui card">
            <div className="image">
                <img src="http://www.irishnews.com/picturesarchive/irishnews/irishnews/2017/02/08/124412940-e22c77b6-7e20-418a-8cb8-44907fe97bf1.jpg" alt="Game Cover" />
            </div>
            <div className="content">
                <div className="header">{vehicle.registration_number}</div>
            </div>
        </div>
    );
}

VehicleCard.propTypes = {
    vehicle: PropTypes.object.isRequired
}
import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default function VehicleCard({ vehicle }) {
    return (
        <div className="ui card">
            <div className="image">
                <img src="http://www.irishnews.com/picturesarchive/irishnews/irishnews/2017/02/08/124412940-e22c77b6-7e20-418a-8cb8-44907fe97bf1.jpg" alt="Game Cover" />
            </div>
            <div className="content">
                <div className="header">{vehicle.registration_number}</div>
            </div>

            <div className="extra content">
                <div className="ui three buttons">
                    <Link to={`/vehicle/${vehicle.id}`} className="ui basic button blue"><i class="car icon"></i></Link>
                    <Link to={`/vehicle/${vehicle.id}`} className="ui basic button green"><i class="edit outline icon"></i></Link>
                    <Link to={'/'} className="ui basic button red"><i class="trash alternate outline icon"></i></Link>
                </div>
            </div>
        </div>
    );
}

VehicleCard.propTypes = {
    vehicle: PropTypes.object.isRequired
}
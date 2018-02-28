import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import DeleteVehicleConformModel from '../models/DeleteVehicleConformModel';

export default function VehicleCard({ vehicle , deleteVehicle }) {

    return (
        <div className="ui card">
            <div className="ui image medium">
                <img src={vehicle.image ?  'http://localhost:3000/'+vehicle.image.medium : "http://www.irishnews.com/picturesarchive/irishnews/irishnews/2017/02/08/124412940-e22c77b6-7e20-418a-8cb8-44907fe97bf1.jpg"} alt="Game Cover" />
            </div>
            <div className="content">
                <div className="header">{vehicle.registration_number}</div>
            </div>

            <div className="extra content">
                <div className="ui four buttons">
                    <Link to={`/vehicle/${vehicle.id}`} className="ui basic button blue"><i className="car icon"></i></Link>
                    <Link to={`/vehicle/${vehicle.id}`} className="ui basic button green"><i className="edit outline icon"></i></Link>
                    {/*<div onClick={() => deleteVehicle(vehicle.id)} className="ui basic button red"><i className="trash alternate outline icon"></i></div>*/}
                    <DeleteVehicleConformModel deleteVehicleAction={deleteVehicle} veh_id={vehicle.id} veh_reg_no={vehicle.registration_number}/>
                </div>
            </div>
        </div>
    );
}

VehicleCard.propTypes = {
    vehicle: PropTypes.object.isRequired
}
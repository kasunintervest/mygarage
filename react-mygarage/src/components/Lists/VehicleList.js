import React from 'react';
import PropTypes from "prop-types";
import VehicleCard from '../Lists/VehicleCard';
import { Link } from 'react-router-dom';
import {Icon} from 'semantic-ui-react';

export default function VehicleList({ vehicles , deleteVehicle  }) {

    const emptyMessage = (
        <p>There are no vehicles yet in your collection.</p>
    );

    const vehicleList = (
        <div className="ui four cards">

            <div className="ui card">
                <Link to="/vehicles/new">
                <div className="cards">
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <div className="content">
                        <div className="center aligned description">
                            <p><Icon name="plus" size="massive" ></Icon></p>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
            { vehicles.length != 0 && vehicles.map(vehicle => vehicle != undefined && <VehicleCard vehicle={vehicle} key={vehicle.id} deleteVehicle={deleteVehicle} />) }
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
    deleteVehicle:PropTypes.func.isRequired
}

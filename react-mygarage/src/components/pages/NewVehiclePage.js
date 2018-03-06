import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VehicleForm from '../../Forms/VehicleForm';
import { createVehicle } from "../../actions/vehicles";

class NewVehiclePage extends React.Component {

    state = {
        vehicle: null
    }

    addVehicle = vehicle => this.props
        .createVehicle(vehicle)
        .then(() => this.props.history.push("/vehicles/list"));

    render(){
        return (
            <div className="ui container left floated" >
                <h1>Add new vehicle</h1>
                <div className="ui container left floated" >
                    <VehicleForm submit={this.addVehicle}/>
                </div>
            </div>
        );
    }
}

NewVehiclePage.propTypes ={
    history:PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    createVehicle: PropTypes.func.isRequired
}

export default connect(null, { createVehicle })(NewVehiclePage);

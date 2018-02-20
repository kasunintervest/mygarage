import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VehicleForm from '../../Forms/VehicleForm';
import {Segment} from 'semantic-ui-react';
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
            <Segment>
                <h1>Add new vehicle</h1>
                <VehicleForm submit={this.addVehicle}/>
            </Segment>
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

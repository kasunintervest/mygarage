import React from 'react';
import PropTypes from "prop-types";
import VehicleList from '../Lists/VehicleList';
import { connect } from 'react-redux';
import { fetchVehicles ,deleteVehicle } from "../../actions/vehicles";
import {allVehiclesSelector} from '../../reducers/vehicles';

class MyVehiclesPage extends React.Component {

    componentWillReceiveProps = (nextProps) => {
        this.vehicles = nextProps.vehicles[0];
    }

    componentDidMount() {
        this.props.fetchVehicles();
    }

    render() {
        return (
            <div className="ui container left" >
                <h1>My vehicles</h1>
                <div className="ui container centered" >
                    { this.props.vehicles.length >=1 && <VehicleList vehicles={ !!this.props.vehicles[0].vehicles ? this.props.vehicles[0].vehicles : this.props.vehicles  }  deleteVehicle={this.props.deleteVehicle}/>}
                </div>
            </div>
        );
    }
}

MyVehiclesPage.propTypes = {
    vehicles: PropTypes.array.isRequired,
    fetchVehicles: PropTypes.func.isRequired,
    deleteVehicle:PropTypes.func.isRequired

}

function mapStateToProps(state) {
    return {
        vehicles: allVehiclesSelector(state)
    }
}

export default connect(mapStateToProps, { fetchVehicles,deleteVehicle })(MyVehiclesPage);

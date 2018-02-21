import React from 'react';
import PropTypes from "prop-types";
import VehicleList from '../Lists/VehicleList';
import { connect } from 'react-redux';
import { fetchVehicles } from "../../actions/vehicles";
import {allVehiclesSelector} from '../../reducers/vehicles';

class MyVehiclesPage extends React.Component {
    componentDidMount() {
        this.props.fetchVehicles();
    }

    render() {
        return (
            <div>
                <h1>My vehicle List</h1>
                { this.props.vehicles.length >=1 && <VehicleList vehicles={this.props.vehicles[0].vehicles} />}
            </div>
        );
    }
}

MyVehiclesPage.propTypes = {
    vehicles: PropTypes.array.isRequired,
    fetchVehicles: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        vehicles: allVehiclesSelector(state)
    }
}

export default connect(mapStateToProps, { fetchVehicles })(MyVehiclesPage);

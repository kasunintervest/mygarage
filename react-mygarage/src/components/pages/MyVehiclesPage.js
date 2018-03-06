import React from 'react';
import PropTypes from "prop-types";
import VehicleList from '../Lists/VehicleList';
import { connect } from 'react-redux';
import { fetchVehicles ,deleteVehicle } from "../../actions/vehicles";
import {allVehiclesSelector} from '../../reducers/vehicles';
import {Header,Icon,Loader} from 'semantic-ui-react';

class MyVehiclesPage extends React.Component {

    state = {
        loading:true,
    };

    componentWillReceiveProps = (nextProps) => {
        this.vehicles = nextProps.vehicles;
        this.setState({
            loading:false
        });
    }

    componentDidMount() {
        this.props.fetchVehicles();
    }

    render() {
        return (
            <div className="ui container left" >
                <Header as='h2' icon  textAlign='center'>
                    <Icon name='car' />
                    My vehicles
                    <Header.Subheader>
                        {
                            typeof this.props.vehicle !== 'undefined' ?  this.props.vehicle.registration_number : ''
                        }
                    </Header.Subheader>
                </Header>

                <div className="ui container centered" >
                    { !!this.state.loading ? <Loader active={true}/> : this.props.vehicles.length >=1 && <VehicleList vehicles={ !!this.props.vehicles[0].vehicles ? this.props.vehicles[0].vehicles : this.props.vehicles  }  deleteVehicle={this.props.deleteVehicle}/>}
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

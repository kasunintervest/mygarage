import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import VehicleServiceRecordList from '../Lists/VehicleServiceRecordList';
import {Message,Loader,Header,Icon} from 'semantic-ui-react';
import {fetchVehicleServiceRecords}  from "../../actions/vehicles";
import {serviceRecordsSelector} from '../../reducers/service_records';
import { fetchVehicle } from "../../actions/vehicles";


class VehicleServiceRecordsPage extends React.Component {


    state = {
        loading:true,
    };

    componentDidMount() {
        this.props.fetchVehicle(this.props.match.params.id);
        this.props.fetchVehicleServiceRecords(this.props.match.params.id);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading:false
        });
    }

    render() {
        return (
            <div className="ui container left" >
                <Header as='h2' icon  textAlign='center'>
                    <Icon name='settings' />
                    Service history
                    <Header.Subheader>
                        {
                            typeof this.props.vehicle !== 'undefined' ?  this.props.vehicle.registration_number : ''
                        }
                    </Header.Subheader>
                </Header>
                <div className=" ui container centered" >
                    {
                      !!this.state.loading ? <Loader active={true}/> : this.props.service_records[0] !== undefined && this.props.service_records[0].length >=1 ? <VehicleServiceRecordList vehicle={this.props.vehicle} serviceRecords={ this.props.service_records[0] } /> : <Message content="No service history found!"/>
                    }
                </div>
            </div>
        )
    }
}

VehicleServiceRecordsPage.propTypes = {
    service_records: PropTypes.array.isRequired,
    fetchVehicleServiceRecords: PropTypes.func.isRequired,
    fetchVehicle: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        service_records: serviceRecordsSelector(state),
        vehicle :  state.vehicles
    }
}

export default connect(mapStateToProps, {fetchVehicle,fetchVehicleServiceRecords})(VehicleServiceRecordsPage);

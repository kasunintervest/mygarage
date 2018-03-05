import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import VehicleServiceRecordList from '../Lists/VehicleServiceRecordList';
import {Message,Loader} from 'semantic-ui-react';
import {fetchVehicleServiceRecords}  from "../../actions/vehicles";
import {serviceRecordsSelector} from '../../reducers/service_records';

import axios from 'axios';

class VehicleServiceRecordsPage extends React.Component {


    state = {
        loading:true,
    };

    componentDidMount() {
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

                <h1>Service history : KU-0386</h1>
                <div className=" ui container centered" >

                    {
                      !!this.state.loading ? <Loader active={true}/> : this.props.service_records[0] != undefined && this.props.service_records[0].length >=1 ? <VehicleServiceRecordList serviceRecords={ this.props.service_records[0] } /> : <Message content="No service history found!"/>


                    }
                </div>
            </div>
        )
    }
}

VehicleServiceRecordsPage.propTypes = {
    service_records: PropTypes.array.isRequired,
    fetchVehicleServiceRecords: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        service_records: serviceRecordsSelector(state)
    }
}

export default connect(mapStateToProps, {fetchVehicleServiceRecords})(VehicleServiceRecordsPage);

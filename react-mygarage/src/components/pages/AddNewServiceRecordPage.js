import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ServiceForm from '../../Forms/AddNewServiceRecordForm';
import { newServiceRecord } from "../../actions/vehicles";

class AddNewServiceRecordPage extends React.Component {

    state = {
        service_record: null
    }

    addServiceRecord = (id,service_record) => this.props
        .newServiceRecord(id,service_record)
        .then(() => this.props.history.push("/vehicles/list"));

    render(){
        return (
            <div className="ui container left floated" >
                <h1>Add new service</h1>
                <div className="ui container left floated" >
                    <ServiceForm submit={this.addServiceRecord} mainProps={this.props}/>
                </div>
            </div>
        );
    }
}

AddNewServiceRecordPage.propTypes ={
    history:PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    newServiceRecord: PropTypes.func.isRequired
}

export default connect(null, { newServiceRecord })(AddNewServiceRecordPage);

import React from 'react';
//import PropTypes from 'prop-types';
import {connect} from 'react-redux'
//import {allVehiclesSelector} from '../../reducers/vehicles';
import DashboardCtA from '../../ctas/DashboardCtA';

const DashboardPage = ({vehicles}) => (
    <div>
        <DashboardCtA/>
    </div>
);

DashboardPage.propTypes = {
}

function mapStateToProps(state) {
    return{
    }
    
}

export default connect(mapStateToProps)(DashboardPage);
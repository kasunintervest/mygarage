import React from 'react';
//import PropTypes from 'prop-types';
import {connect} from 'react-redux'
//import {allVehiclesSelector} from '../../reducers/vehicles';
import DashboardCtA from '../../ctas/DashboardCtA';
import HomePage from './HomePage';

const DashboardPage = ({vehicles}) => (
    <div>
        {/*<HomePage/>*/}
        <DashboardCtA/>
    </div>
);

DashboardPage.propTypes = {
    /*vehicles:PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        registration_number : PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        colour:PropTypes.string.isRequired,
        details:PropTypes.string.isRequired,
        created_at:PropTypes.string.isRequired,
        updated_at:PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
    }).isRequired).isRequired*/
}

function mapStateToProps(state) {
    return{
        //vehicles:allVehiclesSelector(state)
    }
    
}

export default connect(mapStateToProps)(DashboardPage);
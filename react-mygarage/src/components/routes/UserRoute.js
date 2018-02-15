import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route ,Redirect} from 'react-router-dom';

const UserRoute = ({isAuthenticated, component: Component, ...res}) => (
    <Route {...res} render={props => isAuthenticated ? <Component {...props}/> : <Redirect to="/"/> } />
);

UserRoute.protoTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.user_token
    }
}

export default connect(mapStateToProps)(UserRoute);
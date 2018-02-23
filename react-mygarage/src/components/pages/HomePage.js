import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../../actions/auth';
import DashboardPage from './DashboardPage';
import MainIndexPage from './MainIndexPage';


const HomePage = ({isAuthenticated , logout}) => (
  <div>
      {
          isAuthenticated ? <DashboardPage/> :  <MainIndexPage/>/*<div><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></div>*/
      }
  </div>
);

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {

    console.log(state.user);
    return {
        isAuthenticated: !!state.user.user_token ?  state.user.user_token : false
    }
}


export default connect(mapStateToProps,{logout: actions.logout})(HomePage);

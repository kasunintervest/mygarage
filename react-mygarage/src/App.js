import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import NewVehiclePage from './components/pages/NewVehiclePage';
import MyVehiclesPage from './components/pages/MyVehiclesPage';
import SignupPage from './components/pages/SignupPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';
import VehicleForm from "./Forms/VehicleForm";
import UserProfilePage from "./components/pages/UserProfilePage";

const App = ({location , isAuthenticated}) => (
    <div className="ui container">
        {isAuthenticated && <TopNavigation />}
        <Route location={location} path="/" exact component={HomePage}/>
        <GuestRoute  location={location} path="/login" exact component={LoginPage}/>
        <GuestRoute  location={location} path="/signup" exact component={SignupPage}/>
        <UserRoute  location={location} path="/dashboard" exact component={DashboardPage}/>
        <UserRoute  location={location} path="/vehicles/new" exact component={NewVehiclePage}/>
        <UserRoute  location={location} path="/vehicles/list" exact component={MyVehiclesPage}/>
        <UserRoute  location={location} path="/vehicle/:id" exact component={VehicleForm}/>
        <UserRoute  location={location} path="/profile/:id" exact component={UserProfilePage}/>
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

}

function mapStateToProps(state) {

    if(!!state.user.email == false && !!state.user.user_email == true) {
        state.user.email = state.user.user_email;
    }

    return {
        isAuthenticated: !!state.user.email
    }
}

export default  connect(mapStateToProps)(App);

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
import VehicleServiceRecordsPage from "./components/pages/VehicleServiceRecordsPage";
import ServiceCompanyPage from "./components/pages/ServiceCompanyPage";
import mainCss from './styles/mainIndex.css'

const App = ({location , isAuthenticated}) => (
            <div class="main-container">
                <header>
                    {isAuthenticated && <TopNavigation />}
                </header>
                <section>
                    <Route location={location} path="/" exact component={HomePage}/>
                    <GuestRoute  location={location} path="/login" exact component={LoginPage}/>
                    <GuestRoute  location={location} path="/signup" exact component={SignupPage}/>
                    <UserRoute  location={location} path="/dashboard" exact component={DashboardPage}/>
                    <UserRoute  location={location} path="/vehicles/new" exact component={NewVehiclePage}/>
                    <UserRoute  location={location} path="/vehicles/list" exact component={MyVehiclesPage}/>
                    <UserRoute  location={location} path="/vehicle/:id" exact component={VehicleForm}/>
                    <UserRoute  location={location} path="/profile/:id" exact component={UserProfilePage}/>
                    <UserRoute  location={location} path="/vehicle/:id/service/records" exact component={VehicleServiceRecordsPage}/>
                    <UserRoute  location={location} path="/service/companies" exact component={ServiceCompanyPage}/>
                </section>
                <footer>
                    {
                        isAuthenticated && <div id="footer" className="ui inverted vertical footer segment form-page footer-div">
                        <div className="ui container">
                            Intervest 2018 . All Rights Reserved
                        </div>
                        </div>
                    }
                </footer>
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

    if(!!state.user.user_token == false && !!state.user.authentication_token == true) {
        state.user.user_token = state.user.authentication_token;
    }



    return {
        isAuthenticated: !!state.user.email
    }
}

export default  connect(mapStateToProps)(App);

import React from 'react';
import PropTypes from 'prop-types';
import {Card,Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

const DashboardCtA = ({user}) => (


    <div className="ui grid container centered" >
        <div className="four wide column">
            <Card centered>
                <Card.Content textAlign="center">
                    <Card.Header>Add new vehicle</Card.Header>
                    <Link to="/vehicles/new"><Icon name="plus" size="massive" ></Icon></Link>
                </Card.Content>
            </Card>
        </div>
        <div className="four wide column">
            <Card centered>
                <Card.Content textAlign="center">
                    <Card.Header>List my vehicles</Card.Header>
                    <Link to="/vehicles/list"><Icon name="car" size="massive" ></Icon></Link>
                </Card.Content>
            </Card>
        </div>
        <div className="four wide column">
            <Card centered>
                <Card.Content textAlign="center">
                    <Card.Header>Edit my profile</Card.Header>
                    <Link to={`/profile/${user.user_id}`}><Icon name="user" size="massive" ></Icon></Link>
                </Card.Content>
            </Card>
        </div>
       {/* <div class="four wide column">
            <Card centered>
                <Card.Content textAlign="center">
                    <Card.Header>Edit my profile</Card.Header>
                    <Link to="/vehicles/list"><Icon name="car circle" size="massive" ></Icon></Link>
                </Card.Content>
            </Card>
        </div>
        <div class="four wide column"></div>
        <div class="four wide column"></div>
        <div class="four wide column"></div>
        <div class="four wide column"></div>*/}
    </div>
);

function mapStateToProps(state) {
    return{
        user:state.user
    }

}


export default connect(mapStateToProps)(DashboardCtA);

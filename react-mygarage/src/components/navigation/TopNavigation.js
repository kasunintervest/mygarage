import React from 'react';
import PropTypes from 'prop-types';
import {Menu,Dropdown,Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import gravatarUrl from 'gravatar-url'
import * as actions from '../../actions/auth';


const TopNavigation = ({user , logout}) => (
<div>

    <br/>
    <div className="ui menu">
        <Link className="item" as={Link} to="/dashboard">
            Dashboard
        </Link>
        <div className="right menu">
            <div className="item">
                <div className="ui icon input">
                    <input placeholder="Search..." type="text"/>
                        <i className="search link icon"></i>
                </div>
            </div>
            <div className="item">
                <div className="ui inline dropdown">
                    <div className="text">
                        <Image avatar src={ gravatarUrl(user.email)}/>
                        Kalana
                    </div>
                    <i className="dropdown icon"></i>
                    <div className="menu">
                        <div className="item">
                            <img className="ui avatar image" src="/images/avatar/small/jenny.jpg"/>
                                Jenny Hess
                        </div>
                    </div>
                </div>
            </div>
            <a class="item">Help</a>
            <a className="item" onClick={()=>logout()}>Log Out</a>
        </div>
    </div>
    <br/>
</div>
);

TopNavigation.propTypes = {
    user:PropTypes.shape({
        email:PropTypes.string.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        user:state.user
    }
}

export default connect(mapStateToProps,{logout:actions.logout})(TopNavigation);
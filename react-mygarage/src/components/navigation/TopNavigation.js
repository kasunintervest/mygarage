import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import gravatarUrl from 'gravatar-url'
import * as actions from '../../actions/auth';


const TopNavigation = ({user , logout}) => (
<div>

    <br/>
    <div className="ui menu">

        <Link className="item" to="/dashboard">
            <img alt="" src="https://www.xpresslubelakewood.com/wp-content/uploads/2015/11/mygarage300-your1.png" className="ui avatar image"/>
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
                        {user.first_name}
                    </div>
                    {/*<i className="dropdown icon"></i>*/}
                    <div className="menu">
                        <div className="item">
                            <img alt="" className="ui avatar image" src="/images/avatar/small/jenny.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
            <a className="item">Help</a>
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
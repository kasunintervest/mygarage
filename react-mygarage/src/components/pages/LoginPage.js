import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LoginForm from '../../Forms/LoginForm';
import {login} from '../../actions/auth';

class LoginPage extends React.Component {

    submit = data =>
        this.props.login(data).then(()=>this.props.history.push("/"));

    render(){
        return (
            <div>
                <br/>
                <div class="ui middle aligned center aligned grid">
                    <div class="column">
                        <h2 class="ui teal image header">
                        <img src="https://www.xpresslubelakewood.com/wp-content/uploads/2015/11/mygarage300-your1.png" class="image"/>
                        <div class="content">
                            Log-in to your account
                        </div>
                        </h2>
                        <LoginForm submit={this.submit}/>

                        <div class="ui message">
                            New to us? <a href="/signup">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes ={
    history:PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
}

export default connect(null,{login})(LoginPage);

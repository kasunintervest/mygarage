import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SignupForm from '../../Forms/SignupForm';
import {signup} from '../../actions/users';
import LoginPageJs from '../../js/LoginPageJs.js';
import LoginPageCss from '../../styles/loginPage.css';
class SignupPage extends React.Component {
    submit = data => this.props.signup(data).then(()=>this.props.history.push("/dashboard"));

    render(){
        return (
            <div>
                <br/>
                <div class="ui middle aligned center aligned grid">
                    <div className="column">
                        <h2 className="ui teal image header">
                            <a href="/">
                            <img src="https://www.xpresslubelakewood.com/wp-content/uploads/2015/11/mygarage300-your1.png" class="image"/>
                            </a>
                            <div className="content">
                               Register with us!
                            </div>
                        </h2>
                        <div className="ui middle aligned center aligned grid">
                            <div className="column">
                                <SignupForm submit={this.submit}/>
                            </div>
                        </div>

                        <div className="ui message">
                           Already registered? <a href="/login">Log In</a>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

SignupPage.propTypes ={
    history:PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
}


export default connect(null,{signup})(SignupPage);
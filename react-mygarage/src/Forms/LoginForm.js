import React from 'react';
import {Form,Message} from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';


class LoginForm extends React.Component {

    state = {
        data:{
            user_email:'',
            password:''
        },
        loading:false,
        errors:{}
    };

    onChange = e =>
        this.setState({
            data: {...this.state.data,[e.target.name]:e.target.value}
        });

    onSubmit = e =>{
        const errors = this.validate(this.state.data);
        this.setState({errors,loading:true});
        var e = this;

        if(Object.keys(errors).length === 0){
            this.props.submit(this.state.data).catch(function (err) {
                    e.setState({loading:true});
                    if(err.response.data.success == false){
                        e.setState({errors: err.response.data.message,loading:false})
                    }
                }
            );
        }else {
            this.setState({loading:false});
        }
    }

    validate = (data) => {
        const errors = {};

        if(!Validator.isEmail(data.user_email)) errors.user_email = "Invalid email";
        if(!data.password) errors.password = "Can't be blank."

        return errors;
    }

    render(){
        const {data , errors , loading} = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading} className="ui large form">

                {/*<div class="ui stacked segment">*/}

                    {errors[0] && <Message negative><Message.Header>Something went wrong!</Message.Header><p>{errors}</p></Message>}

                    <div className={ `field ${errors.user_email && 'error'} `}>
                        <div class="ui left icon input">
                            <i class="user icon"></i>

                        <input
                            type="email"
                            id="user_email"
                            name="user_email"
                            placeholder="E-mail address"
                            value={data.user_email}
                            onChange={this.onChange}/>

                        </div>
                        {/*{errors.user_email &&  <Message negative>
                            <Message.Header>{errors.user_email}</Message.Header>
                        </Message>}*/}
                    </div>

                    <div className={ `field ${errors.password && 'error'} `}>
                        <div class="ui left icon input">
                            <i class="lock icon"></i>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Make it secure"
                                value={data.password}
                                onChange={this.onChange}/>
                            </div>
                            {/*{errors.password &&  <Message negative>
                                <Message.Header>{errors.password}</Message.Header>
                            </Message>}*/}
                    </div>
                    <button class="ui fluid large teal submit button">Login</button>
                {/*</div>*/}
                {/*<div class="ui error message">
                    {errors.user_email && <InlineError text={errors.user_email}/>}
                    {errors.password && <InlineError text={errors.password}/>}
                </div>*/}
            </Form>
        );
    }
}

LoginForm.propTypes={
    submit: PropTypes.func.isRequired
};

export default LoginForm;

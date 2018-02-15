import React from 'react';
import {Form,Button,Message} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';


class LoginForm extends React.Component {

    state = {
        data:{
            user_email:'kmwattearachchi@gmail.com',
            password:'123456'
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
        this.setState({errors});
        var e = this;

        if(Object.keys(errors).length === 0){
            this.props.submit(this.state.data).catch(function (err) {
                    e.setState({loading:true});
                    if(err.response.data.success == false){
                        e.setState({errors: err.response.data.message,loading:false})
                    }
                }
            );
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
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors[0] && <Message negative>
                    <Message.Header>Something went wrong!</Message.Header>
                    <p>{errors}</p>
                </Message>}
                <Form.Field error={!!errors.user_email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.user_email}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.user_email}/>}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Make it secure"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        );
    }
}

LoginForm.propTypes={
    submit: PropTypes.func.isRequired
};

export default LoginForm;

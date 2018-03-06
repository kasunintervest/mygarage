import React from 'react';
import {Form} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';


class SignupForm extends React.Component {

    state = {
        data:{
            first_name:'',
            last_name:'',
            email:'',
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
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors,loading:true});
        var eVent = this;

        if(Object.keys(errors).length === 0){
            eVent.setState({loading:true});
            this.props.submit(this.state.data).catch(function (err) {
                    eVent.setState({errors: err.response.data.errors,loading:false})
            });
        }else {
            this.setState({loading:false});
        }
    }

    validate = (data) => {
        const errors = {};

        if(!data.first_name) errors.first_name = "First name can't be blank";
        if(!data.last_name) errors.last_name = "First name can't be blank";
        if(!data.email) errors.email = "Invalid email";
        if(!data.password) errors.password = "Password can't be blank.";

        return errors;
    }

    render(){

        const {data , errors , loading} = this.state;

        return (
            <div>

                <Form onSubmit={this.onSubmit} loading={loading}>

                    <Form.Field error={!!errors.first_name}>
                        {/*<label htmlFor="first_name">First name</label>*/}
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="First name"
                            value={data.first_name}
                            onChange={this.onChange}
                        />
                        {/*{errors.first_name && <InlineError text={errors.first_name}/>}*/}
                    </Form.Field>

                    <Form.Field error={!!errors.last_name}>
                        {/*<label htmlFor="last_name">Last name</label>*/}
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Last name"
                            value={data.last_name}
                            onChange={this.onChange}
                        />
                        {/*{errors.last_name && <InlineError text={errors.last_name}/>}*/}
                    </Form.Field>


                    <Form.Field error={!!errors.email}>
                        {/*<label htmlFor="email">Email</label>*/}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={this.onChange}
                        />
                        {errors.email && <InlineError text={errors.email}/>}
                    </Form.Field>

                    <Form.Field error={!!errors.password}>
                        {/*<label htmlFor="password">Password</label>*/}
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
                    <button class="ui fluid large teal submit button">Sign Up</button>

                </Form>
            </div>
        );
    }
}

SignupForm.propTypes={
    submit: PropTypes.func.isRequired
};

export default SignupForm;
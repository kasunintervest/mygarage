import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class VehicleForm extends React.Component {

    state = {
        data:{},
        loading:false,
        errors:{
            name: '',
            registration_number: '',
            make: '',
            model: '',
            year: '',
        }
    };


    onChange = e =>
        this.setState({
            ...this.state,
            data: {...this.state.data,[e.target.name]:e.target.value}
        });


    onSubmit = e =>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err =>
                    this.setState({ errors: !!err.response && !!err.response.data.errors ? err.response.data.errors : {}, loading: false })
                );
        }
    }

    validate = (data) => {
        const errors = {};

        if(!data.name) errors.name = "Vehicle type can't be blank";
        if(!data.registration_number) errors.registration_number = "Vehicle registration number can't be blank";
        if(!data.make) errors.make = "Vehicle make can't be blank";
        if(!data.model) errors.model = "Vehicle model can't be blank";
        if(!data.year) errors.year = "Vehicle type can't be blank";

        return errors;
    }

    render(){

        const {data , errors , loading} = this.state;

        return (
            <div>
                <Form onSubmit={this.onSubmit} loading={loading}>

                    {<Form.Field error={!!errors.name}>
                        <label htmlFor="name">Vehicle Type</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="car"
                            value={data.name || ''}
                            onChange={this.onChange}
                        />
                        {errors.name && <InlineError text={errors.name}/>}
                    </Form.Field>}

                    <Form.Field error={!!errors.registration_number}>
                        <label htmlFor="registration_number">Last name</label>
                        <input
                            type="text"
                            id="registration_number"
                            name="registration_number"
                            placeholder="KU - XXXX"
                            value={data.registration_number  || ''}
                            onChange={this.onChange}
                        />
                        {errors.registration_number && <InlineError text={errors.registration_number}/>}
                    </Form.Field>


                    <Form.Field error={!!errors.make}>
                        <label htmlFor="make">Make</label>
                        <input
                            type="text"
                            id="make"
                            name="make"
                            placeholder="Toyota .."
                            value={data.make  || ''}
                            onChange={this.onChange}
                        />
                        {errors.make && <InlineError text={errors.make}/>}
                    </Form.Field>

                    <Form.Field error={!!errors.model}>
                        <label htmlFor="model">Model</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            placeholder="Prius"
                            value={data.model  || ''}
                            onChange={this.onChange}
                        />
                        {errors.model && <InlineError text={errors.model}/>}
                    </Form.Field>

                    <Form.Field error={!!errors.year}>
                        <label htmlFor="year">year</label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            placeholder="2011"
                            value={data.year  || ''}
                            onChange={this.onChange}
                        />
                        {errors.year && <InlineError text={errors.year}/>}
                    </Form.Field>

                    <Form.Field error={!!errors.colour}>
                        <label htmlFor="colour">colour</label>
                        <input
                            type="text"
                            id="colour"
                            name="colour"
                            placeholder="Silver"
                            value={data.colour  || ''}
                            onChange={this.onChange}
                        />
                        {errors.colour && <InlineError text={errors.colour}/>}
                    </Form.Field>

                    <Form.Field error={!!errors.details}>
                        <label htmlFor="details">details</label>
                        <input
                            type="text"
                            id="details"
                            name="details"
                            placeholder=""
                            value={data.details  || ''}
                            onChange={this.onChange}
                        />
                        {errors.details && <InlineError text={errors.details}/>}
                    </Form.Field>
                    <Button primary>Save</Button>
                </Form>
            </div>
        );
    }
}

VehicleForm.propTypes={
    submit: PropTypes.func.isRequired
};

export default VehicleForm;
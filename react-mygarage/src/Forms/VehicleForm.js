import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import {connect} from 'react-redux'
import { fetchVehicle,updateVehicle } from "../actions/vehicles";


class VehicleForm extends React.Component {

    state = {
        data:{
            id: this.props.vehicle ? this.props.vehicle.id : '',
            name: this.props.vehicle ? this.props.vehicle.name : '',
            registration_number: this.props.vehicle ? this.props.vehicle.registration_number : '',
            make: this.props.vehicle ? this.props.vehicle.make : '',
            model: this.props.vehicle ? this.props.vehicle.model : '',
            colour: this.props.vehicle ? this.props.vehicle.colour : '',
            year: this.props.vehicle ? this.props.vehicle.year : '',
            details: this.props.vehicle ? this.props.vehicle.details : '',
        },
        loading:false,
        errors:{
            name: '',
            registration_number: '',
            make: '',
            model: '',
            year: '',
        }
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            data:{
                id: nextProps.vehicle.id,
                name: nextProps.vehicle.name,
                registration_number: nextProps.vehicle.registration_number,
                make: nextProps.vehicle.make,
                model: nextProps.vehicle.model,
                colour: nextProps.vehicle.colour,
                year: nextProps.vehicle.year,
                details: nextProps.vehicle.details,
            },
            loading:false
        });
    }

    componentDidMount() {
        //if(!!this.props.match.params.id){
        if(this.props !== undefined && this.props.match !== undefined) {
            this.setState({
                loading:true
            });
            this.props.fetchVehicle(this.props.match.params.id);
        }
    }

    onChange = e =>
        this.setState({
            ...this.state,
            data: {...this.state.data,[e.target.name]:e.target.value}
        });


    onSubmit = e =>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        this.setState({
            loading : true
        });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });

            if(this.state.data.id != '') {
                this.props
                    .updateVehicle(this.state.data.id,this.state.data)
                    .catch(err =>
                        this.setState({ errors: !!err.response && !!err.response.data.errors ? err.response.data.errors : {}, loading: false })
                    ).then(()=>this.props.history.push("/vehicles/list"));
            }else {
                this.props
                    .submit(this.state.data)
                    .catch(err =>
                        this.setState({ errors: !!err.response && !!err.response.data.errors ? err.response.data.errors : {}, loading: false })
                    ).then(()=>this.props.history.push("/vehicles/list"));
            }
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
                        <label htmlFor="registration_number">Registration number</label>
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
    //submit: PropTypes.func.isRequired
};

function mapStateToProps(state,props) {

    if(props.match !== undefined && state.vehicles.id != '') {
    //if(state.vehicles.id){
        return {
            vehicle :  state.vehicles,
        }
    }else {
        return {
            vehicle : null
        }
    }
}

export default connect(mapStateToProps,{fetchVehicle,updateVehicle})(VehicleForm);
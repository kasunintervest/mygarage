import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import {connect} from 'react-redux'
import { fetchVehicle,updateVehicle } from "../actions/vehicles";
/*import { findDOMNode } from 'react-dom';*/

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
            image:this.props.vehicle ? this.props.vehicle.image : '',
            user_email:localStorage.email,
            user_token:localStorage.mygarageJWT
        },
        loading:false,
        errors:{
            name: '',
            registration_number: '',
            make: '',
            model: '',
            year: '',
        },
        pictures: false
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
                image:nextProps.vehicle.image,
                user_email:localStorage.email,
                user_token:localStorage.mygarageJWT
            },
            pictures:false,
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

    buildFormData(){
        var formData = new FormData();

        formData.append('vehicle[name]',this.state.data.name);
        formData.append('vehicle[registration_number]',this.state.data.registration_number);
        formData.append('vehicle[make]',this.state.data.make);
        formData.append('vehicle[model]',this.state.data.model);
        formData.append('vehicle[colour]',this.state.data.colour);
        formData.append('vehicle[year]',this.state.data.year);
        formData.append('vehicle[details]',this.state.data.details);
        formData.append('vehicle[image]',this.state.data.image);
        formData.append( 'user_email',localStorage.email);
        formData.append( 'user_token',localStorage.mygarageJWT);

        return formData;
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
            if(this.state.data.id != '') {

                this.props
                    .updateVehicle(this.state.data.id,this.buildFormData())
                    .catch(err =>
                        this.setState({ errors: !!err.response && !!err.response.data.errors ? err.response.data.errors : {}, loading: false })
                    ).then(()=>this.props.history.push("/vehicles/list"));
            }else {

                this.props
                    .submit(this.buildFormData())
                    .catch(err =>
                        this.setState({ errors: !!err.response && !!err.response.data.errors ? err.response.data.errors : {}, loading: false })
                    );

            }
        }else {
            this.setState({
                loading : false
            });
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

    /*file upload*/

    /*removeImage(picture) {
        const filteredAry = this.state.pictures.filter((e) => e !== picture);
        this.setState({pictures: filteredAry})
    }*/


    _handleImageChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        this.setState({
            data:{
                id: this.state.data.id,
                name: this.state.data.name,
                registration_number: this.state.data.registration_number,
                make: this.state.data.make,
                model: this.state.data.model,
                colour: this.state.data.colour,
                year: this.state.data.year,
                image:file,
                user_email:localStorage.email,
                user_token:localStorage.mygarageJWT
            },
            pictures:URL.createObjectURL(file)
        });

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)

        console.log(this.state);
    }

    /*file upload*/


    render(){

        const {data , errors , loading} = this.state;

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img  className="ui small image" src={imagePreviewUrl} />);
        }else {
            if(this.state.data.image && !!this.state.data.pictures == false){
                $imagePreview = (<img  className="ui small image" src={'http://localhost:3000/'+this.state.data.image.medium} />);
            }else {
                if(this.state.data.pictures){
                    $imagePreview = (<img  className="ui small image"  src={this.state.data.pictures} />);
                }

            }
        }

        return (
            <div className="ui container left floated" >

                {this.state.data.id != '' && <h1>Edit vehicle</h1>}
                <Form onSubmit={this.onSubmit} loading={loading}>

                    <Form.Group widths='equal'>
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
                    </Form.Group>

                    <Form.Group widths='equal'>
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
                    </Form.Group>
                    <Form.Field error={!!errors.details}>
                        <label htmlFor="details">details</label>
                        <textarea
                            id="details"
                            name="details"
                            placeholder=""
                            value={data.details  || ''}
                            onChange={this.onChange}
                        />
                        {errors.details && <InlineError text={errors.details}/>}
                    </Form.Field>



                    <Form.Field >
                            <input type="file" id="dddddddd" onChange={this._handleImageChange} />
                            {$imagePreview}
                    </Form.Field>

                    <Button className="ui red labeled icon button" data-tooltip="Save new vehicle" primary>{this.state.loading ? 'Saving...' : 'Save'}
                        <i className="save icon"></i>
                    </Button>

                    <a href='/vehicles/list' className="ui red labeled icon button" data-tooltip="Back to my vehicles page">
                        Cancel
                        <i className="reply icon"></i>
                    </a>

                </Form>
                <br/>
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
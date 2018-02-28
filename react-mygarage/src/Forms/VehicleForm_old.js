import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import {connect} from 'react-redux'
import { fetchVehicle,updateVehicle } from "../actions/vehicles";
import '../styles/fileUpload.css';
import axiosClient from '../axiosClient';

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
            image: this.props.vehicle ? this.props.vehicle.image : '',
        },
        loading:false,
        errors:{
            name: '',
            registration_number: '',
            make: '',
            model: '',
            year: '',
        },

        selectedImageFiles: [],
        submitFormProgress: 0,
        isSubmittingForm: false,
        didFormSubmissionComplete: false,
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

    /*buildFormData(e) {
        this.state.data.image=this.state.selectedImageFiles[0];

        console.log(this.state.data.image);
        return this.state.data;
    }*/

    buildFormData() {
        let formData = new FormData();
        formData.append('name', this.state.data.name);
        formData.append('registration_number', this.state.data.registration_number);
        formData.append('make', this.state.data.make);
        formData.append('model', this.state.data.model);
        formData.append('colour', this.state.data.colour);
        formData.append('year', this.state.data.year);
        formData.append('details', this.state.data.details);


        /*var file = new File(this.state.selectedImageFiles[0], 'ss.jpeg', {
            lastModified: new Date(0), // optional - default = now
            type: "image/jpeg" // optional - default = ''
        });*/


        /*let formData =
                {
                    'name': this.state.data.name,
                    'registration_number':this.state.data.registration_number,
                    'make':this.state.data.make,
                    'model':this.state.data.model,
                    'colour':this.state.data.colour,
                    'year':this.state.data.year,
                    'details':this.state.data.details
                };*/

        //formData['image'] = URL.createObjectURL(this.state.selectedImageFiles[0]);

        /*let { selectedImageFiles } = this.state;
        for (let i = 0; i < selectedImageFiles.length; i++) {
            let file = selectedImageFiles[i];
            if (file.id) {
                if (file._destroy) {
                    formData[`[covers_attributes][${i}][id]`] = file.id;
                    formData[`[covers_attributes][${i}][_destroy]`] = '1';
                }
            } else {
                formData[`[covers_attributes][${i}][photo]`,
                    file,
                    file.name
                );
            }
        }*/

        var options = { vehicle: formData };

        return options;
    }


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
                    .updateVehicle(this.state.data.id,this.state.data)
                    .catch(err =>
                        this.setState({ errors: !!err.response && !!err.response.data.errors ? err.response.data.errors : {}, loading: false })
                    ).then(()=>this.props.history.push("/vehicles/list"));
            }else {

                var  vehicle = this.state.data;

                /*var vehicle = new FormData(this.form);
                vehicle.append('sssss', 'dd');*/
/*
                var vehicle = { formData };
*/

               /* axiosClient.post( 'http://localhost:3000/api/v1/vehicles.json', {vehicle,user_email:localStorage.email,user_token:localStorage.mygarageJWT  },{ headers: {
                    'Content-Type': 'multipart/form-data'
                }});*/


                //console.log(this.buildFormData());

                this.props
                    .submit(this.state.data)
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

    getNumberOfSelectedFiles() {
        return this.state.selectedImageFiles.filter(el => {
            return el._destroy !== true;
        }).length;
    }

    renderUploadCoversButton() {
        let numberOfSelectedCovers = this.getNumberOfSelectedFiles();
        return (
            <div>
                <input
                    name="image[]"
                    ref={field => (this.bookCoversField = field)}
                    type="file"
                    disabled={this.state.isSubmittingForm}
                    multiple={true}
                    accept="image/*"
                    style={{
                        width: 0.1,
                        height: 0.1,
                        opacity: 0,
                        overflow: 'hidden',
                        position: 'absolute',
                        zIndex: -1
                    }}
                    id="book_covers"
                    onChange={e => this.handleBookCoversChange(e)}
                    className="form-control"
                />
                <label
                    disabled={this.state.isSubmittingForm}
                    className="btn btn-success ui button"
                    htmlFor="book_covers">
                    <span className="glyphicon glyphicon-cloud-upload" />
                    &nbsp; &nbsp;
                    {numberOfSelectedCovers === 0
                        ? 'Upload Photos'
                        : `${numberOfSelectedCovers} file${numberOfSelectedCovers !== 1
                            ? 's'
                            : ''} selected`}
                </label>
            </div>
        );
    }

    renderSelectedBookCoverFiles() {
        let fileDOMs = this.state.selectedImageFiles.map((el, index) => {
            if (el._destroy) {
                return null;
            }

            return (
                    <div className="four wide column" key={index+1}>

                        <li key={index}>
                            <div className="photo">
                                <img
                                    width={150}
                                    src={el.id ? el.url : URL.createObjectURL(el)}
                                    style={{ alignSelf: 'center' }}
                                />
                                <div
                                    className="remove"
                                    onClick={() => this.removeSelectedBookCoverFile(el, index)}>
                                    <span style={{ top: 2 }} className="glyphicon glyphicon-remove ui button" >Remove</span>
                                </div>
                            </div>
                            <div className="file-name">
                                {el.name} sss
                            </div>
                        </li>



                </div>


            );
        });

        return (
            <ul className="selected-covers">
                <div className="ui grid small images">
                    {fileDOMs}
                </div>
            </ul>
        );
    }

    renderUploadFormProgress() {
        if (this.state.loading === false) {
            return null;
        }

        return (
            <div className="progress">
                <div
                    className={
                        'progress-bar progress-bar-info progress-bar-striped' +
                        (this.state.submitFormProgress < 100 ? 'active' : '')
                    }
                    role="progressbar"
                    aria-valuenow={this.state.submitFormProgress}
                    min="0"
                    max="100"
                    style={{ width: this.state.submitFormProgress + '%' }}>
                    {this.state.submitFormProgress}% Complete
                </div>
            </div>
        );
    }

    removeSelectedBookCoverFile(cover, index) {
        let { selectedImageFiles } = this.state;
        if (cover.id) {
            selectedImageFiles[index]._destroy = true;
        } else {
            selectedImageFiles.splice(index, 1);
        }

        this.setState({
            selectedImageFiles: selectedImageFiles
        });
    }

    handleBookCoversChange(e) {
        let selectedFiles = this.bookCoversField.files;
        let { selectedImageFiles } = this.state;
        for (let i = 0; i < selectedFiles.length; i++) {
            selectedImageFiles.push(selectedFiles.item(i));
        } //end for

        this.setState(
            {
                selectedImageFiles: selectedImageFiles
            },
            () => {
                this.bookCoversField.value = null;
            }
        );

        this.setState({
            ...this.state,
            data: {...this.state.data,[e.target.name]:'blob:http://localhost:4000/3736f680-cfd3-46b6-b651-e95e89187c3f'}
        });


    }

    /*file upload*/


    render(){

        const {data , errors , loading} = this.state;

        return (
            <div className="ui container left floated" >

                {this.state.data.id != '' && <h1>Edit vehicle</h1>}
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


                    <div className="form-group">
                        <label>Photos</label>
                        {this.renderUploadCoversButton()}
                        {this.renderSelectedBookCoverFiles()}
                    </div>
                    {this.renderUploadFormProgress()}



                    <Button primary>{this.state.loading ? 'Saving...' : 'Save'}</Button>
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
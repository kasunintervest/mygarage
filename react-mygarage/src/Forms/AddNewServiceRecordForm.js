import React from 'react';
import {Form,Button,Dropdown,Input} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import {connect} from 'react-redux';
import ServiceCompanyDropDown from '../components/models/ServiceCompanyDropDown';
import ServiceTypeDropDown from '../components/models/ServiceTypesDropDown';
import { fetchServiceRecord,updateServiceRecord } from "../actions/vehicles";

class AddNewServiceRecordForm extends React.Component {

    state = {
        data: {
            id: this.props.service_record ? this.props.service_record.id : '',
            service_type_id: this.props.service_record ? this.props.service_record.service_type_id : '',
            service_date: this.props.service_record ? this.props.service_record.service_date : '',
            details: this.props.service_record ? this.props.service_record.details : '',
            mileage: this.props.service_record ? this.props.service_record.mileage : '',
            cost: this.props.service_record ? this.props.service_record.cost : '',
            service_company_id: this.props.service_record ? this.props.service_record.service_company_id : '',
            attachment: this.props.service_record ? this.props.service_record.attachment : '',
            user_email: localStorage.email,
            user_token: localStorage.mygarageJWT
        },
        loading: true,
        errors: {
            service_type_id: '',
            service_date: '',
            service_company_id: ''
        },
        pictures: false
    };

    componentWillReceiveProps = (nextProps) => {

        this.setState({
            data:{
                id: nextProps.service_record.id,
                service_type_id: nextProps.service_record.service_type_id,
                service_date: nextProps.service_record.service_date,
                details: nextProps.service_record.details,
                mileage: nextProps.service_record.mileage,
                cost: nextProps.service_record.cost,
                service_company_id: nextProps.service_record.service_company_id,
                attachment: nextProps.service_record.attachment_url,
                user_email: localStorage.email,
                user_token: localStorage.mygarageJWT
            }
        });


        this.setState({
            pictures: false,
            loading: false
        });
    }

    buildFormData() {
        var formData = new FormData();

        formData.append('service_record[service_type_id]', this.state.data.service_type_id);
        formData.append('service_record[service_date]', this.state.data.service_date);
        formData.append('service_record[details]', this.state.data.details);
        formData.append('service_record[mileage]', this.state.data.mileage);
        formData.append('service_record[cost]', this.state.data.cost);
        formData.append('service_record[service_company_id]', this.state.data.service_company_id);
        formData.append('service_record[attachment]', this.state.data.attachment);
        formData.append('user_email', localStorage.email);
        formData.append('user_token', localStorage.mygarageJWT);

        return formData;
    }


    componentDidMount() {
        if(this.props !== undefined && this.props.match !== undefined) {
            this.props.fetchServiceRecord(this.props.match.params.id,this.props.match.params.veh_id);
        }

        this.setState({
            loading: false
        });
    }

    onChange = e =>
        this.setState({
            ...this.state,
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        this.setState({
            loading: true
        });
        if (Object.keys(errors).length === 0) {
            if(this.state.data.id != '') {

                /*this.props
                    .updateVehicle(this.state.data.id,this.buildFormData())
                    .catch(err =>
                        this.setState({ errors: !!err.response && !!err.response.data.errors ? err.response.data.errors : {}, loading: false })
                    ).then(()=>this.props.history.push("/vehicles/list"));*/
            }else {

                this.props
                    .submit(this.props.mainProps.match.params.id,this.buildFormData())
                    .catch(err =>
                        this.setState({ errors: !!err.response && !!err.response.data.errors ? err.response.data.errors : {}, loading: false })
                    );

            }
        } else {
            this.setState({
                loading: false
            });
        }
    }

    validate = (data) => {
        const errors = {};
        if(!data.service_type_id) errors.service_type_id = "Please select a service type";
        if(!data.service_date) errors.service_date = "Please select a service date";
        if(!data.service_company_id) errors.service_company_id = "Please select a service agent";
        return errors;
    }


    _handleImageChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        this.setState({
            data: {
                id: this.state.data.id,
                service_type_id: this.state.data.service_type_id,
                service_date: this.state.data.service_date,
                details: this.state.data.details,
                mileage: this.state.data.mileage,
                cost: this.state.data.cost,
                service_company_id: this.state.data.service_company_id,
                attachment: file,
                user_email: localStorage.email,
                user_token: localStorage.mygarageJWT
            },
            pictures: URL.createObjectURL(file)
        });


        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {

        const {data, errors, loading} = this.state;

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className="ui small image" src={imagePreviewUrl}/>);
        } else {
            if (this.state.data.attachment && !!this.state.data.pictures == false) {
                $imagePreview = (<img className="ui small image" src={'http://localhost:3000/' + this.state.data.attachment.medium}/>);
            } else {
                if (this.state.data.pictures) {
                    $imagePreview = (<img className="ui small image" src={this.state.data.pictures}/>);
                }

            }
        }

        return (
            <div className="ui container left floated" >
                {this.state.data.id != '' && <h1>Edit Service</h1>}
                <Form onSubmit={this.onSubmit} loading={loading}>
                    {/*{<Form.Field error={!!errors.service_type_id}>
                        <label htmlFor="service_type_id">Service type</label>
                        <Dropdown
                            id="service_type_id"
                            name="service_type_id"
                            placeholder="Service type"
                            fluid search selection options={[{ key: '1', value: '1', flag: 'af', text: 'Toyota Lanka' }]} />
                        {errors.service_type_id && <InlineError text={errors.service_type_id}/>}
                    </Form.Field>}*/}

                    <Form.Group widths='equal'>
                        {<Form.Field error={!!errors.service_type_id}>
                            <label htmlFor="service_type_id">Service type</label>
                            <ServiceTypeDropDown
                                id="service_type_id"
                                name="service_type_id"
                                placeholder="Service Type"
                                selectedId={ typeof this.props.service_record.service_type !== 'undefined' && this.props.service_record.service_type.id}
                                options={{className:"fluid search selection"}}
                                onChange={this.onChange}
                            />

                            {errors.service_type_id && <InlineError text={errors.service_type_id}/>}
                        </Form.Field>}

                        {<Form.Field error={!!errors.service_company_id}>
                            <label htmlFor="service_company_id">Service Company</label>
                            <ServiceCompanyDropDown
                                id="service_company_id"
                                name="service_company_id"
                                placeholder="Service Company"
                                selectedId={ typeof this.props.service_record.service_company !== 'undefined' && this.props.service_record.service_company.id}
                                options={{className:"fluid search selection"}}
                                onChange={this.onChange}
                            />
                            {errors.service_company_id && <InlineError text={errors.service_company_id}/>}
                        </Form.Field>}

                        {<Form.Field error={!!errors.service_date}>
                            <label htmlFor="service_date">Service Date</label>
                            <div className="ui input left icon">
                                <i className="calendar icon"></i>
                                <input
                                    type="date"
                                    id="service_date"
                                    name="service_date"
                                    placeholder="Service Date"
                                    value={data.service_date || ''}
                                    onChange={this.onChange}
                                />
                            </div>
                            {errors.service_date && <InlineError text={errors.service_date}/>}
                        </Form.Field>}
                    </Form.Group>

                    <Form.Group widths='equal'>

                        {<Form.Field error={!!errors.cost}>

                            <label htmlFor="cost">Cost</label>
                            <div className="ui right labeled input ">
                                <label htmlFor="amount" className="ui label">$</label>
                                <input
                                    type="text"
                                    id="cost"
                                    name="cost"
                                    placeholder="Cost"
                                    value={data.cost || ''}
                                    onChange={this.onChange}
                                />
                                <div className="ui basic label">.00</div>
                            </div>

                            {errors.cost && <InlineError text={errors.cost}/>}
                        </Form.Field>}
                        {<Form.Field error={!!errors.mileage}>
                            <label htmlFor="mileage">Mileage</label>
                            <Input label='km' type="text" labelPosition='right'
                                   id="mileage"
                                   name="mileage"
                                   placeholder="Mileage"
                                   value={data.mileage || ''}
                                   onChange={this.onChange} />
                            {errors.mileage && <InlineError text={errors.mileage}/>}
                        </Form.Field>}
                    </Form.Group>
                    <Form.Group widths='equal'>
                        {<Form.Field error={!!errors.details}>
                            <label htmlFor="details">Details</label>
                            <textarea
                                type="text"
                                id="details"
                                name="details"
                                placeholder="Details"
                                value={data.details || ''}
                                onChange={this.onChange}
                            />
                            {errors.details && <InlineError text={errors.details}/>}
                        </Form.Field>}

                        {<Form.Field >
                            <label htmlFor="cost">Attachment</label>
                            <input type="file" id="attachment" className="ui borderless" onChange={this._handleImageChange} />
                            {$imagePreview}
                        </Form.Field>}
                    </Form.Group>
                    <Button primary>{this.state.loading ? 'Saving...' : 'Save'}</Button>
                </Form>
            </div>
        );
    }
}

AddNewServiceRecordForm.propTypes={
//submit: PropTypes.func.isRequired
};

function mapStateToProps(state,props) {

    if(props.match !== undefined && state.service_records !== undefined && state.service_records.id != '') {
        return {
            service_record :  state.service_records,
        }
    }else {
        return {
            service_record : null
        }
    }
}

export default connect(mapStateToProps,{fetchServiceRecord,updateServiceRecord})(AddNewServiceRecordForm);
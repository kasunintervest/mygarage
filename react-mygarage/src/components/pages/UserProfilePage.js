import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import UserProfileEditForm from '../../Forms/UserProfileEditForm';
import { updateUser } from "../../actions/users";


class UserProfilePage extends React.Component {

    state = {
        data:{
            email: this.props.user ? this.props.user.email : '',
            first_name: this.props.user ? this.props.user.first_name : '',
            last_name: this.props.user ? this.props.user.last_name : '',
        },
        loading:false,
        errors:{
            first_name: '',
            last_name: '',
        }
    };

    onChange = e =>this.setState({
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

            if(this.props.user.user_id != '') {
                this.props
                    .updateUser(this.props.user.user_id,this.state.data)
                    .catch(err =>
                        this.setState({ errors: !!err.response && !!err.response.data.errors ? err.response.data.errors : {}, loading: false })
                    ).then(()=>this.props.history.push("/dashboard"));
            }
        }else {
            this.setState({
                loading : false
            });
        }
    }

    validate = (data) => {
        console.log(data);

        const errors = {};

        if(!data.first_name) errors.first_name = "Your first name can't be blank";
        if(!data.last_name) errors.last_name = "Your last name can't be blank";

        return errors;
    }

    render() {
        return (
            <div className="ui  container left floated" >
                <h1>Edit My Profile</h1>
                <UserProfileEditForm errors={this.state.errors } user={ this.state.data  }  updateUser={this.props.updateUser} onChange={this.onChange} loading={this.state.loading} onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

UserProfilePage.propTypes = {
    user:PropTypes.shape({}).isRequired,
    updateUser: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps ,{updateUser} )(UserProfilePage);

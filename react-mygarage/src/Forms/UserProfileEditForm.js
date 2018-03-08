import React from 'react';
import PropTypes from "prop-types";
import {Form,Button} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

export default function UserProfileEditForm({ onSubmit,loading, user  , errors , onChange }) {

    return (
        <div>
            <div>
                <Form onSubmit={onSubmit} loading={loading}>

                    {console.log(user)}
                    <Form.Field>
                        <label htmlFor="name">E-mail</label>
                        <label htmlFor="name" className="ui label grey">{user.email || 'No email'}</label>
                    </Form.Field>

                    <Form.Field error={!!errors.first_name}>
                        <label htmlFor="name">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="car"
                            value={user.first_name || ''}
                            onChange={onChange}
                        />
                        {errors.first_name && <InlineError text={errors.first_name}/>}
                    </Form.Field>

                    <Form.Field error={!!errors.last_name}>
                        <label htmlFor="name">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="car"
                            value={user.last_name || ''}
                            onChange={onChange}
                        />
                        {errors.last_name && <InlineError text={errors.last_name}/>}
                    </Form.Field>

                    <Button className="ui red labeled icon button" data-tooltip="Update profile info" primary>
                        {loading ? 'Saving...' : 'Save'}
                        <i className="save icon"></i>
                    </Button>

                    <a href='/dashboard' className="ui red labeled icon button" data-tooltip="Back to dashboard page">
                        Cancel
                        <i className="reply icon"></i>
                    </a>
                </Form>
            </div>
        </div>
    );
}

UserProfileEditForm.propTypes = {
    user: PropTypes.object.isRequired
}
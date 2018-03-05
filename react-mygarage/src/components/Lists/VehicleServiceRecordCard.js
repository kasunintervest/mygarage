import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Icon,Rating,Button,Card,Grid,Image} from 'semantic-ui-react';
//import DeleteVehicleServiceRecordConformModel from '../models/DeleteVehicleServiceRecordConformModel';

export default function VehicleServiceRecordCard({ serviceRecord  }) {

    return (
        <Card fluid>

            {console.log(serviceRecord)}
            <Card.Content>
                <Grid>
                    <Grid.Column width={3}>
                        <Image className="large" src='https://www.northsomersetccg.nhs.uk/media/document_thumbnails/community-health-services-wider-stakeholder-event-.png' />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ul.
                        </p>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Card>
                            <Card.Content>
                                <Image floated='right' size='mini' src='http://www.vanlock.ie/wp-content/uploads/2017/07/toyota-logo.png' />
                                <Card.Header>
                                    Toyota Lanka (PVT) Ltd
                                </Card.Header>
                                <Card.Meta>
                                    2018-02-22
                                </Card.Meta>
                                <br/>
                                <Card.Description>
                                    Service type: <strong>General</strong>
                                </Card.Description>
                                <br/>
                                <Card.Meta>
                                    Rate your service:
                                </Card.Meta>
                                <Card.Description>
                                    <Rating maxRating={5} defaultRating={3} icon='star' size='huge' />
                                </Card.Description>
                            </Card.Content>

                            <Card.Content extra>
                                <div className='ui three buttons'>
                                    <Button basic color='green' data-tooltip="View Toyota Lanka (PVT) Ltd profile ">
                                        <Icon className="address card outline"/>
                                    </Button>
                                    <Button basic color='blue' data-tooltip="Edit service details">
                                        <Icon className="edit"/>
                                    </Button>
                                    <Button basic color='red' data-tooltip="Delete service details">
                                        <Icon className="trash"/>
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Card.Content>
        </Card>
    );
}

VehicleServiceRecordCard.propTypes = {
}
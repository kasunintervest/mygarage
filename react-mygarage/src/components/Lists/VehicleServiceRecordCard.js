import React from 'react';
import {Icon,Rating,Button,Card,Grid,Image} from 'semantic-ui-react';
//import DeleteVehicleServiceRecordConformModel from '../models/DeleteVehicleServiceRecordConformModel';

export default function VehicleServiceRecordCard({ serviceRecord  }) {

    return (
        <Card fluid>
            <Card.Content>
                <Grid>
                    <Grid.Column width={3}>
                            <Image className="large" src={'http://localhost:3000'+serviceRecord.attachment_url.medium} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                            <div className="content">
                                <p className="ui sub ">{serviceRecord.details}</p>
                                <div className="ui small feed">
                                    <div className="event">
                                        <div className="content">
                                            <div className="summary">
                                                <a>Date : </a> {serviceRecord.service_date}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event">
                                        <div className="content">
                                            <div className="summary">
                                                <a>Mileage : </a> {serviceRecord.mileage}km
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event">
                                        <div className="content">
                                            <div className="summary">
                                                <a>Cost : </a> {serviceRecord.cost}/=
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Card>
                            <Card.Content>
                                <Image floated='right' size='mini' src='http://www.vanlock.ie/wp-content/uploads/2017/07/toyota-logo.png' />
                                <Card.Header>
                                    {serviceRecord.service_company.name}
                                </Card.Header>
                                <br/>
                                <Card.Description>
                                    Service type: <strong>{serviceRecord.service_type.name}</strong>
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
                                    <Button basic color='green' data-tooltip={ 'View '+serviceRecord.service_company.name+' profile'}>
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
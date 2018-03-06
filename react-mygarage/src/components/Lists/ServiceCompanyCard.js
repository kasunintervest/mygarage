import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Rating,Card,Image,Icon} from 'semantic-ui-react';

export default function ServiceCompanyCard({ company }) {

    return (


        <div class="ui card">

            {console.log(company)}


            <div class="content">
                <div class="header">{company.name} <Image floated='right' size='mini' src='http://www.vanlock.ie/wp-content/uploads/2017/07/toyota-logo.png' /></div>
            </div>
            <div class="content">
                <div class="ui small feed">

                    <div class="event">
                        <div class="content">
                            <div class="summary">
                                <a><Icon name="map marker alternate"/></a>
                               {company.address}
                            </div>
                        </div>
                    </div>

                    <div class="event">
                        <div class="content">
                            <div class="summary">
                                <a href={company.facebook_url} target="_blank"><Icon name="facebook"/> {company.facebook_url}</a>
                            </div>
                        </div>
                    </div>

                    <div class="event">
                        <div class="content">
                            <div class="summary">
                                <a href={company.website_url} target="_blank"><Icon name="globe"/> {company.website_url}</a>
                            </div>
                        </div>
                    </div>

                    <div class="event">
                        <div class="content">
                            <div class="summary">
                                <a><Icon name="phone"/></a>
                                {company.phone}
                            </div>
                        </div>
                    </div>

                    <div class="event">
                        <div class="content">
                            <div class="summary">
                                <p>{company.other_details}</p>
                                <p>{company.description}</p>
                            </div>
                        </div>
                    </div>

                    <br/>
                    <Card.Description>
                        <Rating maxRating={5} defaultRating={3} icon='star' size='huge' disabled={true}/>
                    </Card.Description>
                </div>
            </div>


            <div class="extra content ">
                <span class="right floated ">
                  <i class="like icon"></i>
                  17 likes
                </span>
                <i class="comment icon"></i>
                3 comments
            </div>

            <div class="extra content">
                <div class="ui large transparent left icon input">
                    <i class="comment outline icon"></i>
                    <input placeholder="Add Comment..." type="text"/>
                </div>
            </div>
        </div>


    );
}

ServiceCompanyCard.propTypes = {
    company: PropTypes.object.isRequired
}
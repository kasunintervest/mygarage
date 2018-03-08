import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { fetchServiceCompanies } from "../../actions/ServiceCompany";
import {allServiceCompaniesSelector} from '../../reducers/service_companies';
import {Message,Loader,Header,Icon} from 'semantic-ui-react';
import ServiceCompanyList from '../Lists/ServiceCompanyList';

class ServiceCompanyPage extends React.Component {

    state = {
        loading:true,
    };

    componentDidMount() {
        this.props.fetchServiceCompanies();
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading:false
        });
    }

    render() {
        return (
            <div className="ui container left" >
                <Header as='h2' icon  textAlign='center'>
                    <Icon name='car' />
                    Service Coppanies
                </Header>

                <div className="ui container centered" >
                    {
                        !!this.state.loading ? <Loader active={true}/> : this.props.service_companies !== undefined && this.props.service_companies.length >=1 ? <ServiceCompanyList service_companies={ this.props.service_companies } /> : <Message content="No service history found!"/>
                    }
                </div>
            </div>
        );
    }
}

ServiceCompanyPage.propTypes = {
    service_companies: PropTypes.array.isRequired,
    fetchServiceCompanies: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        service_companies: allServiceCompaniesSelector(state)
    }
}

export default connect(mapStateToProps, { fetchServiceCompanies })(ServiceCompanyPage);

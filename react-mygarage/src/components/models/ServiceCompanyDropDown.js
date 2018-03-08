import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {fetchServiceCompanies} from '../../actions/ServiceCompany';
import {allServiceCompaniesSelector} from '../../reducers/service_companies';

class ServiceCompanyDropDown extends React.Component {

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

    createOptionItems(selectedId = false) {
        let items = [];

        this.props.service_companies.map((e, key) => {
            if(selectedId == e.id){
                items.push(<option key={key} selected={true} value={e.id}>{e.name}</option>);
            }else {
                items.push(<option key={key} value={e.id}>{e.name}</option>);
            }
        })

        return items;
    }

    render() {
        return (
            <div>
                <select className={!!this.props.options.className && this.props.options.className} onChange={this.props.onChange} id={this.props.id} name={this.props.name} placeholder={this.props.placeholder}>
                    {this.createOptionItems(this.props.selectedId)}
                </select>
            </div>
        );
    }
}

ServiceCompanyDropDown.propTypes = {
    fetchServiceCompanies: PropTypes.func.isRequired
}

function mapStateToProps(state,props) {
    return {
        service_companies: allServiceCompaniesSelector(state)
    }
}


export default connect(mapStateToProps,{fetchServiceCompanies})(ServiceCompanyDropDown);
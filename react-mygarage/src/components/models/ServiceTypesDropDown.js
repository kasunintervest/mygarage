import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {fetchServiceTypes} from '../../actions/ServiceCompany';
import {allServiceTypesSelector} from '../../reducers/service_types';

class ServiceTypesDropDown extends React.Component {

    state = {
        loading:true,
    };

    componentDidMount() {
        this.props.fetchServiceTypes();
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading:false
        });
    }

    createOptionItems(selectedId = false) {
        let items = [];

        this.props.service_types.map((e, key) => {

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

ServiceTypesDropDown.propTypes = {
    fetchServiceTypes: PropTypes.func.isRequired
}

function mapStateToProps(state,props) {
    return {
        service_types: allServiceTypesSelector(state)
    }
}


export default connect(mapStateToProps,{fetchServiceTypes})(ServiceTypesDropDown);
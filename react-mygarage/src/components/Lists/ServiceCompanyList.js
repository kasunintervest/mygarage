import React from 'react';
import PropTypes from "prop-types";
import ServiceCompanyCard from '../Lists/ServiceCompanyCard';

export default function ServiceCompanyList({ service_companies  }) {

    const emptyMessage = (
        <p>There are no service companies.</p>
    );

    const companyList = (
        <div className="ui four cards">
            { service_companies.length !== 0 && service_companies.map(company => company !== undefined && <ServiceCompanyCard company={company} key={company.id} />) }
        </div>
    );

    return (
        <div>
            {service_companies.length === 0 ? emptyMessage : companyList}
        </div>
    );
}

ServiceCompanyList.propTypes = {
    service_companies: PropTypes.array.isRequired,
}

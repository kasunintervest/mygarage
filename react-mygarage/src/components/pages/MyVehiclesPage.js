import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux'
import { fetchVehicles } from "../../actions/vehicles";
import {allVehiclesSelector} from '../../reducers/vehicles';

class MyVehiclesPage extends React.Component {

    state = {
        loading:false,
        errors:{},
        current_page:0,
        number_of_pages:0
    };


    componentDidMount = () => this.onInit(this.props);

    onInit = (props) => props.fetchVehicles();


    createTableRows(vehicles){
        if (vehicles.length >=1 ) {
            /*console.log(vehicles[0].vehicles[0].name)*/


            console.log(vehicles[0].total_pages)
            console.log(vehicles[0].current_page)
            console.log(vehicles[0].vehicles)




            return (
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Reg Number</th>
                            <th>Model</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        vehicles[0].vehicles.map((vehicle) =>
                            <tr>
                                <td>
                                    {vehicle.registration_number}
                                </td>
                                <td>{vehicle.model}</td>
                                <td>
                                    <div class="ui centered grid">
                                        <button class="ui primary medium button">Edit</button>
                                        <button class="ui negative medium button">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }

                    </tbody>
                    <tfoot>
                    <tr><th colSpan="3">
                        <div className="ui right floated pagination menu">
                            <a className="icon item">
                                <i className="left chevron icon"></i>
                            </a>
                            <a className="item">1</a>
                            <a className="item">2</a>
                            <a className="item">3</a>
                            <a className="item">4</a>
                            <a className="icon item">
                                <i className="right chevron icon"></i>
                            </a>
                        </div>
                    </th>
                    </tr></tfoot>
                </table>
            )
        }
    }

    render(){

        const { vehicles } = this.props;

        return (
            <div>

                {
                    /*vehicles.length >=1 &&

                    vehicles[0].map((t) =>
                        <h3>{t.id}</h3>
                    )*/

                    vehicles.length == 1 && this.createTableRows(vehicles)

                }

            </div>
        );

    }
}

MyVehiclesPage.propTypes = {
    fetchVehicles: PropTypes.func.isRequired,
    vehicles:PropTypes.arrayOf(PropTypes.shape({
       /* id: PropTypes.string.isRequired,
        registration_number : PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        colour:PropTypes.string.isRequired,
        details:PropTypes.string.isRequired,
        created_at:PropTypes.string.isRequired,
        updated_at:PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,*/
    }).isRequired).isRequired
}

function mapStateToProps(state) {
    return {
        vehicles: allVehiclesSelector(state)
    };
}



export default connect(mapStateToProps, { fetchVehicles })(MyVehiclesPage);

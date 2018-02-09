import React from "react"
import PropTypes from "prop-types"
class AllVehicles extends React.Component {

    constructor(props){
        super(props);
        this.state={vehicles:[]}
    }

    //getInitialState() { return { vehicles: [] } }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/vehicles.json?user_email=kmwattearachchi@gmail.com&user_token=dasdadad3")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        vehicles: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, vehicles } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                {vehicles.map(item => (
                    <li key={item.id}>
            {item.name} {item.id}
        </li>
        ))}
        </ul>
        );
        }
    }
}

export default AllVehicles

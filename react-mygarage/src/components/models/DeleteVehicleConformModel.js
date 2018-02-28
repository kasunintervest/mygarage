import React, { Component } from 'react'
import { Container,Loader,Button, Header, Icon, Modal } from 'semantic-ui-react'
import '../../styles/deleteVehicleModel.css'

export default class DeleteVehicleConformModel extends Component {
    state = {
        open: false,
        loading : false
    }

    showModel = () => this.setState({ open: true })

    close = () => this.setState({ open: false })

    yesClicked = () =>{
        this.props.deleteVehicleAction(this.props.veh_id);
        this.setState({ open: true,loading:true })
    }

    render() {
        const { loading,open } = this.state

        return (
            <di className="ui basic button red" onClick={this.showModel}><i className="trash alternate outline icon"></i>
                <Modal
                    className="vehicleModel"
                    open={open}  basic size='small' closeOnEscape={false} closeOnRootNodeClick={false}>
                    <Container textAlign='center'>
                        <h1 ><i className="trash alternate outline icon"></i>Are you sure?</h1>
                        <hr/>
                    </Container>
                    <Container textAlign='center'>

                    <Modal.Content>
                            {
                                loading ? (<Loader active inline='centered' size='large' />) : ('')
                            }
                            <h2>
                                {this.props.veh_reg_no}
                            </h2>
                        <p className="center">

                            Are you sure, you want to delete this vehicle? All the data related will be wiped out!

                        </p>
                    </Modal.Content>
                    </Container>
                    <hr/>
                    <br/>
                    <br/>
                    <Container textAlign='center'>
                        <Modal.Actions>
                            <Button basic color='red' inverted onClick={this.close}>
                                <Icon name='remove' /> No
                            </Button>
                            <Button color='green' inverted onClick={this.yesClicked}>
                                <Icon name='checkmark' /> Yes
                            </Button>
                        </Modal.Actions>
                    </Container>

                </Modal>
            </di>
        )
    }
}

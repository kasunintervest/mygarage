import React, { Component } from 'react';

class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {draweropen: false,currentScreen:[]};
  }
  componentDidMount(){
    var currentScreen=[];
    currentScreen.push(<UploadScreen appContext={this.props.appContext} role={this.props.role}/>);
    this.setState({currentScreen})
  }

  render() {
    return (
        <p>asdsad</p>
    );
  }
}

export default UploadScreen;

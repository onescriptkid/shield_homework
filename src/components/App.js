import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { openModal } from '../actions/transient';
import DroneHeader from './DroneHeaderDir/DroneHeader.js';
import DroneBody from './DroneBodyDir/DroneBody.js';
import DroneUpload from './DroneUploadDir/DroneUpload.js';
import DroneDeep from './DroneDeepDir/DroneDeep.js';

const mapStateToProps = (state) => {
  return ({
    ...state
  });
}
const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(openModal())
  }
}

class App extends Component {

  render() {
    const {openModal} = this.props;
    return (
      <div className="App">
        <DroneHeader openModal={openModal} />
        <DroneBody />
        <DroneDeep />
        <DroneUpload />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

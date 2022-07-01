import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import './DroneBody.css'
import { connect } from 'react-redux';
import {updateFilterFlightTime } from '../../actions/logs.js';


const maptStateToDispatch = (dispatch) => {
  return {
    updateFilterFlightTime: (v) => dispatch(updateFilterFlightTime(v))
  }
}

const mapStateToProps = (state) => {
  return {
    flight_time: state.logs.filters.flight_time,
  }
}

class DroneFlightTime extends Component {

  onInputFlightTime = (e) => {
    this.props.updateFilterFlightTime(e.target.value);
  }

  render() {
    const { flight_time } = this.props;
    return (
      <Input value={flight_time}
      error={flight_time.length !== 0 && !Number(flight_time)}
      onInput={this.onInputFlightTime} fluid placeholder="Flight Time <= (minutes)"/>
    )
  }
}

export default connect(mapStateToProps, maptStateToDispatch)(DroneFlightTime); 
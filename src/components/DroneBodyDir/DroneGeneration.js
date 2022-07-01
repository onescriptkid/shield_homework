import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './DroneBody.css'
import { connect } from 'react-redux';

import { updateFilterGeneration } from '../../actions/logs.js';

const maptStateToDispatch = (dispatch) => {
  return {
    updateFilterGeneration: (v) => dispatch(updateFilterGeneration(v))
  }
}

const mapStateToProps = (state) => {
  return {
    generation: state.logs.filters.generation,
  }
}

class DroneGeneration extends Component {

  constructor(props) {
    super(props);
    this.options = [{text:'', value:null}, ...Array(30).fill(0).map((v, i) => ({
      text: i,
      value: i
    }))];
  }

  onChangeDropdown = (e, {value}) => {
    this.props.updateFilterGeneration(value);
  }

  render() {
    const { generation } = this.props;
    return (
      <Dropdown fluid selection options={this.options} placeholder='Generation'
        value={generation}
      onChange={this.onChangeDropdown}
      />
    )
  }
}

export default connect(mapStateToProps, maptStateToDispatch)(DroneGeneration); 
import React, { Component } from 'react';
import './DroneBody.css'
import { connect } from 'react-redux';
import { updateFilterCreatedAtRange } from '../../actions/logs.js';
import {
  DatesRangeInput
} from 'semantic-ui-calendar-react';

const mapStateToDispatch = (dispatch) => {
  return {
    updateFilterCreatedAtRange: (v) => dispatch(updateFilterCreatedAtRange(v))
  }
}

const mapStateToProps = (state) => {
  return {
    created_at_start: state.logs.filters.created_at_start,
    created_at_end: state.logs.filters.created_at_end,
  }
}

class DroneDatePicker extends Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  onChangeDateRange = (event, { name, value }) => {
    this.props.updateFilterCreatedAtRange(value)
  }

  render() {
    const {created_at_end, created_at_start} = this.props;

    let created_at_range = '';
    if(created_at_start.length !== 0) {

      created_at_range = `${created_at_start} - ${created_at_end}`;
    }
    return (
      <DatesRangeInput
        style={{cursor:'pointer'}}
        fluid
        ref={ref => {ref && ref.inputNode && ref.inputNode.setAttribute('readonly', true)}}
        popupPosition= "bottom left"
        name="datesRange"
        placeholder="From - To"
        dateFormat="MM-DD-YYYY"
        value={created_at_range}
        iconPosition="left"
        onChange={this.onChangeDateRange} />
    )
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(DroneDatePicker); 
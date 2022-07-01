import React, { Component } from 'react';
import { Segment, Header} from 'semantic-ui-react';
import './DroneDeep.css'
import { connect } from 'react-redux';
import { closeModal } from '../../actions/transient';

import ReactJson from 'react-json-view';

const mapStateToProps = (state) => {
  return ({
    logs: state.logs.logs,
    rowSelected: state.transient.rowSelected
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

class DroneDeep extends Component {

  onClose = () => {
    this.props.closeModal();
  }

  render() {
    const {logs, rowSelected} = this.props;
    if(!rowSelected) {return null}
    return (
      <Segment style={{position:'absolute', bottom: 0, right: 0}}>
        <Header>{`Raw Log Id - ${rowSelected}`}</Header>
        <ReactJson name={false} src={logs[rowSelected]} />
      </Segment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DroneDeep);
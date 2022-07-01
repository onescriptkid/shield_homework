import React, { Component } from 'react';
import './DroneUpload.css'

import ReactFileReader from 'react-file-reader';
import { Header, Icon, Loader, Button, Grid, Modal } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { closeModal } from '../../actions/transient';
import { insertLogs } from '../../actions/logs';

const FORMAT = {
  generation: 'integer',
  start_time: 'timestamp',
  end_time: 'timestamp',
  lat: 'float',
  lng: 'float',
  layout: 'uuid',
  created_at: 'timestamp',
  username: 'text'
}

const mapStateToProps = (state) => {
  return ({
    open: state.transient.uploadModal,
    isFetching: state.logs.isFetching,
    lastRequest: state.logs.lastRequest,
    success: state.logs.success,
    error: state.logs.error,
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    insertLogs: (csv) => dispatch(insertLogs(csv)),
  }
}

class DroneUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
  }

  onSubmitClick = () => {
    const { file } = this.state;
    if (file) {
      this.props.insertLogs(file);
    }
  }

  onClick = () => {
    this.props.closeModal();
  }

  handleFiles = (files) => {
    this.setState({
      file: files[0]
    })
  }

  render() {
    const { open, isFetching, success, error, lastRequest } = this.props;
    const { file } = this.state;
    return (
      <Modal
        open={open}
        basic
        size='large'
      >
        <Header icon='browser' content='Upload Drone Logs' />
        <Modal.Content >
          <h4 style={{ paddingBottom: '1.5rem' }}>
            <Grid columns={'equal'}>
              {Object.keys(FORMAT).map(k => (
                <Grid.Column key={k}>
                  <Grid.Row>
                    <code>{k}</code>
                  </Grid.Row>
                  <Grid.Row>
                    <code>{FORMAT[k]}</code>
                  </Grid.Row>
                </Grid.Column>
              ))}
            </Grid>
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', 'marginBottom': '1rem' }}>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
              <Button color='teal' inverted className='btn'>Upload CSV</Button>
            </ReactFileReader>
            <code style={{ color: '#54ffff' }}>{file ? file.name : 'None Selected'}</code>
          </div>
          {isFetching && <Loader>Uploading</Loader>}
          {!success && lastRequest === 'Upload Logs' &&
            <div style={{ color: 'red', display: 'flex', justifyContent: 'space-between' }}>
              <b>
                <Icon name="warning" />
                Upload Error
              </b>
              <b>
                {JSON.stringify(error)}
              </b>
            </div>
          }
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' onClick={this.props.closeModal} inverted>
            <Icon name='remove' /> Cancel
          </Button>
          <Button disabled={!file} color='green' loading={isFetching} onClick={this.onSubmitClick} inverted>
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DroneUpload);
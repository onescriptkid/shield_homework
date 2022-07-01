import React, { Component } from 'react';
import { Header, Segment, Input, Button, Grid, Table } from 'semantic-ui-react';
import './DroneBody.css'
import { connect } from 'react-redux';
import DroneDatePicker from './DroneDatePicker.js';
import DroneFlightTime from './DroneFlightTime.js';
import DroneGeneration from './DroneGeneration.js';
import DroneAccordion from './DroneAccordion.js';
import DroneNetwork from './DroneNetwork.js';

import { fetchLogs, updateFilterUsername, updateFilterClearAll } from '../../actions/logs.js';
import { selectRow, deselectRow } from '../../actions/transient.js';

const mapStateToDispatch = (dispatch) => {
  return {
    fetchLogs: filters => dispatch(fetchLogs(filters)),
    updateFilterUsername: v => dispatch(updateFilterUsername(v)),
    updateFilterClearAll: () => dispatch(updateFilterClearAll()),
    selectRow: (key) => dispatch(selectRow(key)),
    deselectRow: () => dispatch(deselectRow())
  }
}

const mapStateToProps = (state) => {
  return {
    logs: state.logs.logs,
    filters: state.logs.filters,
    username: state.logs.filters.username,
    isFetching: state.logs.isFetching,
    success: state.logs.success,
    error: state.logs.error,
    rowSelected: state.transient.rowSelected
  }
}

class DroneBody extends Component {

  componentDidMount() {
    this.props.fetchLogs(this.props.filters);
  }

  onInputUsername = (e) => {
    this.props.updateFilterUsername(e.target.value);
  }

  onClickSubmit = () => {
    this.props.fetchLogs(this.props.filters);
  }
  onClickClear = () => {
    this.props.updateFilterClearAll();
  }
  onClickRow = (e) => {
    const { rowSelected } = this.props;
    if(rowSelected !== e.currentTarget.id) {
      this.props.selectRow(e.currentTarget.id);
    } else {
      this.props.deselectRow();
    }
  }

  render() {
    return (
      <Grid padded="vertically" divided>
        <Grid.Column style={this.buildFilterStyles()} width={3}>
          {this.renderFilters()}
        </Grid.Column>
        <Grid.Column width={12}>
            <DroneAccordion />
          <Segment as={Table} selectable>
            {this.renderTable()}
          </Segment>
        </Grid.Column>
        <Grid.Column width={1}>
          <Header>
            {Object.keys(this.props.logs).length} Logs
          </Header>
        </Grid.Column>
      </Grid>
    );
  }

  renderTable = () => {
    const { logs, rowSelected } = this.props;
    const rows = Object.values(logs);
    return (
      <React.Fragment>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>Generation</Table.HeaderCell>
            <Table.HeaderCell>Flight Time (minutes) </Table.HeaderCell>
            <Table.HeaderCell>Latitude / Longitude</Table.HeaderCell>
            <Table.HeaderCell>Building Layout</Table.HeaderCell>
            <Table.HeaderCell>Uploaded</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

          {rows.map(r => {
            const uptime = (new Date(r.end_time) - new Date(r.start_time)) / (60 * 1000);
            return (
              <Table.Row 
                positive={rowSelected && rowSelected === ""+r.id}
                style={{cursor:'pointer'}}
                onClick={this.onClickRow}
                key={r.id} id={r.id}>
                <Table.Cell>{r.id}</Table.Cell>
                <Table.Cell>{r.drone_generation}</Table.Cell>
                <Table.Cell>{uptime}</Table.Cell>

                <Table.Cell>{`${r.lat}, ${r.lng}`}</Table.Cell>
                <Table.Cell>{r.building_map_layout}</Table.Cell>
                <Table.Cell>{new Date(r.created_at).toLocaleString()}</Table.Cell>
                <Table.Cell>{r.username}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </React.Fragment>
    );
  }

  renderFilters = () => {
    const {username, lastRequest, isFetching, error} = this.props;
    return (
      <React.Fragment>
        <Grid.Row>
          <Header >
            Filters
          </Header>
        </Grid.Row>
        <Grid.Row>
          <DroneDatePicker />
        </Grid.Row>
        <Grid.Row>
          <DroneFlightTime />
        </Grid.Row>
        <Grid.Row>
          <DroneGeneration />
        </Grid.Row>
        <Grid.Row>
          <Input value={username}
          onInput={this.onInputUsername} placeholder="User" fluid />
        </Grid.Row>
        <Grid.Row>
          <Button onClick={this.onClickClear} color="red"> Clear</Button>
          <Button loading={isFetching} onClick={this.onClickSubmit} floated="right" primary> Submit</Button>
        </Grid.Row>
        <DroneNetwork isFetching={isFetching} error={error} lastRequest={lastRequest} />
      </React.Fragment>
    );
  }

  buildFilterStyles = () => {
    return ({
      'textAlign': 'left',
      'paddingLeft': '2rem'
    });
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(DroneBody);
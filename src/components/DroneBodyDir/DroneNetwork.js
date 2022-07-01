import React from 'react';
import { Grid, Message } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

export default function ({ error }) {
  return (
    <Grid.Row stretched>
      {error &&
        <Message style={{width:'fit-content', 'zIndex':'1000'}}negative>
          <Message.Header>API Error!</Message.Header>
          <ReactJson name={false} src={error} />
        </Message>
      }
    </Grid.Row>
  );
}
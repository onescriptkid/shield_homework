import React from 'react';
import { Header, Segment, Icon, Button } from 'semantic-ui-react';
import './DroneHeader.css'

export default function DroneHeader({openModal}) {
  return (
    <Segment className={"DroneHeaderSegment"} inverted>
        <Header
          style={{margin:'0 0 0 0'}}
          color="teal"
          as='h2'
          icon="shield"
          content="Drone Log Explorer" />
        <Button basic inverted onClick={openModal} color='green'>
          <Icon name="upload"/>
          Upload
        </Button>
    </Segment>
  );
} 
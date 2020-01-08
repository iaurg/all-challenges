import React from 'react';
import './App.css';
import { Pane } from 'evergreen-ui';
import EventList from './components/EventList';
import Betslip from './components/Betslip';

function App() {
  return (
    <Pane
      data-testid="event-list"
      clearfix
      display="flex-collumn"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop={5}
      width="100%"
      maxWidth={350}
    >
      <Betslip />
      <EventList />
    </Pane>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Pane, Alert, Spinner } from 'evergreen-ui';
import axios from 'axios';
import Event from './Event';

export default function EventList() {
  const [eventList, setEventList] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://www.mocky.io/v2/59f08692310000b4130e9f71'
      );
      setEventList(result.data);
    }
    fetchData();
  }, []);

  if (!eventList) {
    return (
      <Pane
        data-testid="loading"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={400}
      >
        <Spinner />
      </Pane>
    );
  }

  return (
    <Pane data-testid="event-list">
      {eventList.length ? (
        eventList
          .filter(event => event.markets.length > 0)
          .map(event => (
            <Event
              key={event.id}
              id={event.id}
              name={event.name}
              markets={event.markets}
            />
          ))
      ) : (
        <Alert
          data-testid="alert-card"
          appearance="card"
          intent="none"
          title="No events to show"
          marginBottom={32}
        />
      )}
    </Pane>
  );
}

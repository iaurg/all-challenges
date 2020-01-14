import React, { useState, useEffect } from 'react';
import { Pane, Alert, Spinner } from 'evergreen-ui';
import axios from 'axios';
import Event from './Event';
import Betslip from './Betslip';

export default function EventList() {
  const [eventList, setEventList] = useState(null);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://www.mocky.io/v2/59f08692310000b4130e9f71'
      );
      setEventList(result.data);
    }
    fetchData();
    const bets = localStorage.getItem('bets', JSON.stringify(checked));
    if (bets) {
      setChecked(JSON.parse(bets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bets', JSON.stringify(checked));
  }, [checked]);

  function removeBet(betId) {
    const filteredBet = checked.filter(bet => bet.betId !== betId);
    setChecked(filteredBet);
  }

  function addBet(betId, betName, betPrice, marketName) {
    const betObject = {
      marketName,
      betId,
      betName,
      betPrice,
    };
    setChecked([...checked, betObject]);
    localStorage.setItem('bets', JSON.stringify(checked));
  }

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
      <Betslip removeBet={e => removeBet(e)} checkedBets={checked} />

      {eventList.length ? (
        eventList
          .filter(event => event.markets.length > 0)
          .map(event => (
            <Event
              key={event.id}
              id={event.id}
              name={event.name}
              markets={event.markets}
              addBet={(betId, betName, betPrice, marketName) =>
                addBet(betId, betName, betPrice, marketName)
              }
              removeBet={e => removeBet(e)}
              checkedBets={checked}
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

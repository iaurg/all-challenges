import React, { useState, useEffect } from 'react';
import { Pane, Card, Heading, Button } from 'evergreen-ui';
import PropTypes from 'prop-types';

export default function Event({ id, name, markets }) {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const bets = localStorage.getItem('bets', JSON.stringify(checked));
    if (bets) {
      setChecked(bets);
    }
  }, [checked]);
  // Look this can be better...Refactor!
  function changeButton(eventId, marketName, betName, betValue) {
    const betsStorage = JSON.parse(localStorage.getItem('bets'));
    const betObject = {
      event: {
        id: eventId,
        markets: {
          market: {
            name: marketName,
            bet: {
              betName,
              betValue,
            },
          },
        },
      },
    };
    // Not good big O
    if (betsStorage) {
      betsStorage.map(item => {
        if (item.event.id === eventId) {
          let holdItem = item.event.markets;
          holdItem = { text: 2 };
          for (const [key, value] of Object.entries(item.event.markets)) {
            console.log(key, value.name); // "a 5", "b 7", "c 9"
          }
          // const updateStorage = [...betsStorage, betObject];
          // localStorage.setItem('bets', JSON.stringify(updateStorage));
        }
      });
      // const updateStorage = [...betsStorage, betObject];
      // localStorage.setItem('bets', JSON.stringify(updateStorage));
      return;
    }

    setChecked(JSON.stringify([betObject]));
    localStorage.setItem('bets', JSON.stringify([betObject]));
  }

  return (
    <Card key={id} border="default" marginTop={15} paddingBottom={20}>
      <Pane
        background="tint1"
        paddingTop={15}
        paddingBottom={15}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading is="h1">{name}</Heading>
      </Pane>
      {markets.map(market => (
        <Pane key={market.id} paddingBottom={10} paddingTop={20}>
          <Heading is="h4" paddingBottom={20} paddingLeft={20}>
            {market.name}
          </Heading>
          <Pane
            width="100%"
            display="flex"
            alignItems="left"
            paddingLeft={20}
            justifyContent="left"
            flexWrap="wrap"
          >
            {market.selections.map(option => (
              <Button
                key={option.id}
                height={32}
                marginRight={10}
                marginTop={5}
                intent="success"
                appearance={
                  checked.includes(option.name) ? 'primary' : 'default'
                }
                onClick={() =>
                  changeButton(id, market.name, option.name, option.price)
                }
              >
                {option.name} - {option.price}
              </Button>
            ))}
          </Pane>
        </Pane>
      ))}
    </Card>
  );
}

Event.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selections: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
};

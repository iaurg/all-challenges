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
  function removeBet(betId) {
    const betsStorage = JSON.parse(localStorage.getItem('bets'));
    if (betsStorage) {
      const newItems = betsStorage.filter(bet => bet.betId !== betId);
      const updateStorage = [...newItems];
      if (updateStorage.length === 0) {
        setChecked([]);
        localStorage.removeItem('bets');
        return;
      }
      localStorage.setItem('bets', JSON.stringify(updateStorage));
      setChecked(JSON.stringify([updateStorage]));
    }
  }

  function changeButton(betId, betName, betValue, marketName) {
    const betsStorage = JSON.parse(localStorage.getItem('bets'));
    const betObject = {
      marketName,
      betId,
      betValue,
      betName,
    };

    if (betsStorage) {
      const updateStorage = [...betsStorage, betObject];
      setChecked(JSON.stringify(updateStorage));
      localStorage.setItem('bets', JSON.stringify(updateStorage));
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
                  checked.includes(option.id)
                    ? removeBet(option.id)
                    : changeButton(
                        option.id,
                        option.name,
                        option.price,
                        market.name
                      )
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

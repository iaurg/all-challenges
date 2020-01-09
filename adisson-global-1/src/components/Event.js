import React, { useState, useEffect } from 'react';
import { Pane, Card, Heading, Button } from 'evergreen-ui';

export default function Event({ id, name, markets }) {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const bets = localStorage.getItem('bets', JSON.stringify(checked));
    if (bets) {
      setChecked(bets);
    }
  }, [checked]);

  function changeButton(eventId, marketName, betName, betValue) {
    const betsStorage = JSON.parse(localStorage.getItem('bets'));

    if (betsStorage) {
      if (betsStorage[eventId]) {
        if (betsStorage[eventId][marketName]) {
          betsStorage[eventId][marketName] = {
            [betName]: betValue,
          };
        } else {
          betsStorage[eventId] = {
            ...betsStorage[eventId],
            [marketName]: { [betName]: { betValue } },
          };
        }
        const updateStorage = {
          ...betsStorage,
        };

        localStorage.setItem('bets', JSON.stringify(updateStorage));
        setChecked(JSON.stringify(updateStorage));
        return;
      }

      const updateStorage = {
        ...betsStorage,
        [eventId]: { [marketName]: { [betName]: { betValue } } },
      };

      localStorage.setItem('bets', JSON.stringify(updateStorage));
      setChecked(JSON.stringify(updateStorage));
      return;
    }

    localStorage.setItem(
      'bets',
      JSON.stringify({
        [eventId]: { [marketName]: { [betName]: { betValue } } },
      })
    );
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

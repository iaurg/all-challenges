import React from 'react';
import { Pane, Card, Heading, Button } from 'evergreen-ui';
import PropTypes from 'prop-types';

export default function Event({
  id,
  name,
  markets,
  addBet,
  removeBet,
  checkedBets,
}) {
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
                  checkedBets.some(bet => bet.betId === option.id)
                    ? 'primary'
                    : 'default'
                }
                onClick={() =>
                  checkedBets.some(bet => bet.betId === option.id)
                    ? removeBet(option.id)
                    : addBet(option.id, option.name, option.price, market.name)
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

Event.defaultProps = {
  checkedBets: [],
};

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
  removeBet: PropTypes.func.isRequired,
  addBet: PropTypes.func.isRequired,
  checkedBets: PropTypes.arrayOf(
    PropTypes.shape({
      marketName: PropTypes.string.isRequired,
      betId: PropTypes.string.isRequired,
      betName: PropTypes.string.isRequired,
      betPrice: PropTypes.number.isRequired,
    })
  ),
};

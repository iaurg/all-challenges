import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Betslip from '../../components/Betslip';

const removeBetMock = jest.fn();
describe('Test Bets list', () => {
  it('should bet list starts empty', () => {
    const { getByText } = render(
      <Betslip checkedBets={[]} removeBet={removeBetMock} />
    );
    const betButton = getByText('See Bets');
    expect(betButton).toBeInTheDocument();
    fireEvent.click(betButton);
    expect(getByText('No bets')).toBeInTheDocument();
  });

  it('should list bets based on checked states', () => {
    const { getByText } = render(
      <Betslip
        checkedBets={[
          {
            marketName: 'Team to Win',
            betId: 'SEL_1',
            betName: 'Real Madrid',
            betPrice: 1.23,
          },
        ]}
        removeBet={removeBetMock}
      />
    );
    const betButton = getByText('See Bets');
    expect(betButton).toBeInTheDocument();
    fireEvent.click(betButton);
    expect(getByText('Real Madrid - Team to Win')).toBeInTheDocument();
  });
});

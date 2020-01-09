import React from 'react';
import { render } from '@testing-library/react';
import Betslip from '../../components/Betslip';

describe('Test Bets list', () => {
  it('should bet list start empty', () => {
    const { getByText, fireEvent } = render(<Betslip />);
    const betButton = getByText('See Bets');
    fireEvent.click(betButton);
    expect(betButton).toBeInTheDocument();
    expect(getByText('No bets')).toBeInTheDocument();
  });
});

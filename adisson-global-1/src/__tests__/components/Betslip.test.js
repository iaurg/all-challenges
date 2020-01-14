import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Betslip from '../../components/Betslip';

describe('Test Bets list', () => {
  it('should bet list starts empty', () => {
    const { getByText } = render(<Betslip />);
    const betButton = getByText('See Bets');
    expect(betButton).toBeInTheDocument();
    fireEvent.click(betButton);
    expect(getByText('No bets')).toBeInTheDocument();
  });

  // it('should list bets based on localstorage', () => {
  //   localStorage.__STORE__.auth = { oi: 2 };
  //   expect(localStorage.setItem).toHaveBeenLastCalledWith('KEY', 'VALUE');
  //   expect(localStorage.setItem).toHaveBeenLastCalledWith('auth', { oi: 2 });
  // });
});

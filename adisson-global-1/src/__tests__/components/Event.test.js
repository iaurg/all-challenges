import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Event from '../../components/Event';

const marketsModel = [
  {
    id: 'MKT_1',
    name: 'Team to Win',
    selections: [
      {
        id: 'SEL_1',
        name: 'Real Madrid',
        price: 1.23,
      },
      {
        id: 'SEL_2',
        name: 'Barcelona',
        price: 2.05,
      },
    ],
  },
];

const addBetMock = jest.fn();
const checkedBets = [
  {
    marketName: 'Team to Win',
    betId: 'SEL_1',
    betName: 'Real Madrid',
    betPrice: 1.23,
  },
];

describe('Test Event Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render event', () => {
    const { getByText } = render(
      <Event
        key="EVT_1"
        id="EVT_1"
        name="Real Madrid vs Barcelona"
        markets={marketsModel}
        checkedBets={[]}
      />
    );

    expect(getByText('Team to Win')).toBeInTheDocument();
  });

  it('change button color when click', () => {
    const { getByText, rerender } = render(
      <Event
        id="EVT_1"
        name="Real Madrid vs Barcelona"
        markets={marketsModel}
        addBet={addBetMock}
        checkedBets={[]}
      />
    );
    const marketButton = getByText('Real Madrid - 1.23');
    fireEvent.click(marketButton);
    expect(addBetMock).toBeCalledTimes(1);
    rerender(
      <Event
        id="EVT_1"
        name="Real Madrid vs Barcelona"
        markets={marketsModel}
        checkedBets={checkedBets}
      />
    );
    expect(marketButton).toHaveStyle(`
      background-image: linear-gradient(rgb(35, 194, 119), rgb(57, 157, 108));
      color:white;
    `);
  });
});

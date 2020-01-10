import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
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

describe('Test Event Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render correct event', () => {
    const { asFragment } = render(
      <Event
        key="EVT_1"
        id="EVT_1"
        name="Real Madrid vs Barcelona"
        markets={marketsModel}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('change button color when click', () => {
    const { getByText } = render(
      <Event
        id="EVT_1"
        name="Real Madrid vs Barcelona"
        markets={marketsModel}
      />
    );
    const marketButton = getByText('Real Madrid - 1.23');
    fireEvent.click(marketButton);
    expect(marketButton).toHaveStyle(`
      background-image: linear-gradient(rgb(35, 194, 119), rgb(57, 157, 108));
      color:white;
    `);

    fireEvent.click(marketButton);

    expect(marketButton).toHaveStyle(`
      background-image: linear-gradient(to bottom, #FFFFFF, #F4F5F7);
      color:#00783e;
    `);
  });

  it('should store on localStorage', () => {
    let { getByText } = render(
      <Event
        id="EVT_1"
        name="Real Madrid vs Barcelona"
        markets={marketsModel}
      />
    );
    const marketButton = getByText('Real Madrid - 1.23');
    fireEvent.click(marketButton);

    cleanup();

    ({ getByText } = render(
      <Event
        id="EVT_1"
        name="Real Madrid vs Barcelona"
        markets={marketsModel}
      />
    ));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'bets',
      JSON.stringify({
        EVT_1: { 'Team to Win': { 'Real Madrid': { betValue: 1.23 } } },
      })
    );

    expect(marketButton).toHaveStyle(`
      background-image: linear-gradient(rgb(35, 194, 119), rgb(57, 157, 108));
      color:white;
    `);
  });
});

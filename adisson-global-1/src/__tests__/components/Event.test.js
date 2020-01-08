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
  {
    id: 'MKT_2',
    name: 'Player to Score First',
    selections: [
      {
        id: 'SEL_3',
        name: 'Ronaldo',
        price: 1.15,
      },
      {
        id: 'SEL_4',
        name: 'Messi',
        price: 1.3,
      },
      {
        id: 'SEL_5',
        name: 'Bale',
        price: 1.35,
      },
    ],
  },
];

afterEach(cleanup);

it('should render correct event', () => {
  const { asFragment } = render(
    <Event id="EVT_1" name="Real Madrid vs Barcelona" markets={marketsModel} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it('change button color when click', () => {
  const { getByText } = render(
    <Event id="EVT_1" name="Real Madrid vs Barcelona" markets={marketsModel} />
  );
  const marketButton = getByText('Ronaldo - 1.15');
  fireEvent.click(marketButton);
  expect(marketButton).toHaveStyle(`
    background-image: linear-gradient(rgb(35, 194, 119), rgb(57, 157, 108));
    color:white;
  `);
});
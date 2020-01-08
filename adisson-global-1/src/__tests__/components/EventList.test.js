import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import EventList from '../../components/EventList';

it('loads and displays eventlist', async () => {
  const events = [
    {
      id: 'EVT_1',
      name: 'Real Madrid vs Barcelona',
      markets: [
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
      ],
    },
    {
      id: 'EVT_2',
      name: 'Atletico Madrid vs Malaga',
      markets: [
        {
          id: 'MKT_3',
          name: 'Team to Win',
          selections: [
            {
              id: 'SEL_6',
              name: 'Atletico',
              price: 1.4,
            },
            {
              id: 'SEL_7',
              name: 'Malaga',
              price: 3.05,
            },
          ],
        },
      ],
    },
    {
      id: 'EVT_3',
      name: "Empty Event that shouldn't render",
      markets: [],
    },
  ];
  const result = { data: events };
  axiosMock.get.mockResolvedValueOnce({ result });

  const { getByTestId } = render(<EventList />);
});

// it('should be able to render a list of events', async () => {
//   const { getByTestId } = render(<EventList />);
//   expect(getByTestId('loader')).toBeInTheDocument();
//   await wait(() => expect(getByTestId('event-list')).toBeInTheDocument());
// });

// it('should alert without events', () => {
//   const { getByTestId } = render(<EventList />);
//   const alertCard = getByTestId('alert-card');
//   expect(alertCard).toBeTruthy();
// });

it('not render Event if has no market', () => {});

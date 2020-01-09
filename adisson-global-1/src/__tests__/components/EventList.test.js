import React from 'react';
import { render, wait } from '@testing-library/react';
import axios from 'axios';
import EventList from '../../components/EventList';

jest.mock('axios');

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
    ],
  },
];

describe('Test EventList', () => {
  it('Fetch without events and displays alert', async () => {
    axios.mockResolvedValue({ data: [] });

    const { getByTestId } = render(<EventList />);

    const loading = getByTestId('loading');

    expect(loading).toBeInTheDocument();

    await wait(() => expect(getByTestId('alert-card')).toBeInTheDocument());
  });

  it('Fetch with events and displays events', async () => {
    axios.mockResolvedValue({ data: events });

    const { getByTestId } = render(<EventList />);

    const loading = getByTestId('loading');

    expect(loading).toBeInTheDocument();

    await wait(() => expect(getByTestId('event-list')).toBeInTheDocument());
  });
});

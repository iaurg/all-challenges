import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

it('renders App without crashing', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('event-list')).toBeInTheDocument();
});

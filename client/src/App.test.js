import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../src/App';

test('renders enter button on landing page', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const enterButton = screen.getByText(/Enter/i);
  expect(enterButton).toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from '@chakra-ui/core';

test('renders App without crashing', () => {
  const { getByText } = render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  const header = getByText(/Vapaat tennistunnit/i);
  expect(header).toBeInTheDocument();
});

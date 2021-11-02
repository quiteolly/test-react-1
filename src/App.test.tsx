import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the form', () => {
	render(<App />);
	const formElement = screen.getByText(/Leave a comment/);
	expect(formElement).toBeInTheDocument();
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from '../index';

describe('Heading', () => {
  it('renders the heading with the correct text', () => {
    render(<Heading as="h1" size="xxl">Test Heading</Heading>);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });
});

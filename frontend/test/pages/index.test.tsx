import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../../src/pages/index';
import '@testing-library/jest-dom'


// Mocking the fetch API call
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ did: 'sampleDID' }),
  })
);

describe('Home Component', () => {
  it('renders the header correctly', () => {
    render(<Home />);
    const header = screen.getByText(/Register DID from seed/i);
    expect(header).toBeInTheDocument();
  });

  it('submits the form and displays the DID', async () => {
    render(<Home />);

    // Fill in the seed input
    const seedInput = screen.getByPlaceholderText('Enter your seed...');
    await userEvent.type(seedInput, 'sampleSeed');

    // Click the submit button
    const submitButton = screen.getByText('Submit');
    await userEvent.click(submitButton);

    // Wait for the DID to be displayed
    const didText = await screen.findByText(/Your DID:/i);
    expect(didText).toBeInTheDocument();
    const didValue = screen.getByText('sampleDID');
    expect(didValue).toBeInTheDocument();
  });
});
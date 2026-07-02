import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ClientList } from '../modules/clients/pages/ClientList';

describe('ClientList Component', () => {
  it('renders the Client List header', () => {
    render(
      <BrowserRouter>
        <ClientList />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Clients')).toBeInTheDocument();
    expect(screen.getByText('Manage your customer base')).toBeInTheDocument();
  });

  it('renders the Add Client button', () => {
    render(
      <BrowserRouter>
        <ClientList />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Add Client')).toBeInTheDocument();
  });

  it('renders the mock clients correctly', () => {
    render(
      <BrowserRouter>
        <ClientList />
      </BrowserRouter>
    );
    
    // Check if names exist in the table
    expect(screen.getByText('Rahul Sharma')).toBeInTheDocument();
    expect(screen.getByText('Priya Patel')).toBeInTheDocument();
    expect(screen.getByText('Anil Kumar')).toBeInTheDocument();
  });
});

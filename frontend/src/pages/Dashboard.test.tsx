import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
  });
  
  it('renders welcome message correctly', () => {
    render(<Dashboard />);
    
    // Verify the welcome message is displayed
    expect(screen.getByText('Welcome to the Dashboard!')).toBeInTheDocument();
  });
  
  it('displays logout button', () => {
    render(<Dashboard />);
    
    // Verify logout button is present
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
  
  it('handles logout correctly', () => {
    // Set up a token in localStorage
    localStorage.setItem('token', 'test_token');
    
    render(<Dashboard />);
    
    // Click the logout button
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    
    // Verify the token was removed from localStorage
    expect(localStorage.getItem('token')).toBeNull();
    
    // Verify redirection occurred
    expect(window.location.href).toBe('/');
  });
  
  it('redirects to homepage when logging out', () => {
    render(<Dashboard />);
    
    // Click the logout button
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    
    // Verify redirection occurred
    expect(window.location.href).toBe('/');
  });
});
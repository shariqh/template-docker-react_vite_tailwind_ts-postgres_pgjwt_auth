import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  it('renders login form correctly', () => {
    render(<Login />);
    
    // Check if form elements are present
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /log in/i });
    
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginButton).toBeDefined();
  });
});
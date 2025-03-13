import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        window.location.href = '/dashboard';
      } else {
        alert('Invalid login');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error. Please try again later.');
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <input
          className="border p-2 mb-4 w-full"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

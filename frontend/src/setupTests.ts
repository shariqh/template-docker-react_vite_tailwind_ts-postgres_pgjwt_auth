import '@testing-library/jest-dom';

// Mock window.location assignments
Object.defineProperty(window, 'location', {
  writable: true,
  value: { href: window.location.href },
});

// Mock localStorage
const localStorageMock = (function() {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock fetch API
window.fetch = jest.fn() as jest.Mock;

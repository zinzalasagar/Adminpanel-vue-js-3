// utils/auth.js
export function isAuthenticated() {
    // Check if the user is authenticated (e.g., by verifying the presence of a token in local storage)
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
  }
  
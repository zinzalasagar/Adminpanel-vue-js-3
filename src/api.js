// api.js
const api = {
    async fetchBankInfo() {
      try {
        const response = await fetch('https://example.com/api/bank-info');
        if (!response.ok) {
          throw new Error('Failed to fetch bank info');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching bank info:', error);
        throw error; // Rethrow the error to handle it in the calling code
      }
    }
  };
  
  export default api;
  
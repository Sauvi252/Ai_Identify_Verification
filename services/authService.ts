
// MOCK AUTHENTICATION SERVICE
// Simulates a backend API for Enterprise Login

const DELAY_MS = 1500; // Simulate network latency

// In-memory user database for the demo session
const users = [
  { email: 'admin@verisecure.com', password: 'admin123', name: 'Admin User' },
  { email: 'demo@student.com', password: 'password', name: 'Student Demo' },
  { email: 'sauravkumart927@gmail.com', password: 'Saurav@1151', name: 'Saurav Kumar' }
];

export const authService = {
  // Simulate Enterprise Login API call
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
          reject(new Error("User not found. Please sign up first."));
          return;
        }

        if (user.password !== password) {
          reject(new Error("Incorrect password. Please try again."));
          return;
        }

        resolve({
          email: user.email,
          name: user.name,
          token: "mock-jwt-token-" + Date.now()
        });
      }, DELAY_MS);
    });
  },

  // Simulate Registration API call
  signup: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (existingUser) {
          reject(new Error("User already exists. Please login."));
          return;
        }

        // Register new user
        const newUser = { email, password, name: email.split('@')[0] };
        users.push(newUser);

        resolve({
          email: newUser.email,
          name: newUser.name,
          token: "mock-jwt-token-" + Date.now()
        });
      }, DELAY_MS);
    });
  }
};

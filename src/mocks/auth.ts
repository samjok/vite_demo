export interface MockAuthResponse {
  token: string;
  expiresIn?: number; // seconds
}

// Simple mock login function. Accepts one valid credential pair and
// rejects otherwise. Simulates network latency.
export function mockLogin(
  email: string,
  password: string,
): Promise<MockAuthResponse> {
  const validEmail = "user@example.com";
  const validPassword = "password123";

  return new Promise((resolve, reject) => {
    // simulate network delay
    setTimeout(() => {
      if (email === validEmail && password === validPassword) {
        resolve({ token: "mocked-jwt-token-abc123", expiresIn: 60 * 60 });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 800);
  });
}

export default mockLogin;

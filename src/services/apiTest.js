// Simple API test file
import { authAPI, apiClient } from './api.js';

// Test basic API connection
export async function testAPIConnection() {
  try {
    const response = await apiClient.get('/');
    console.log('✅ API Connection Test:', response);
    return true;
  } catch (error) {
    console.error('❌ API Connection Failed:', error);
    return false;
  }
}

// Test authentication endpoints
export async function testAuthEndpoints() {
  console.log('🧪 Testing Authentication Endpoints...');
  
  // Test with invalid credentials (should fail gracefully)
  try {
    await authAPI.login({ email: 'test@test.com', password: 'wrongpassword' });
    console.log('❌ Login test failed - should have thrown error');
  } catch (error) {
    console.log('✅ Login error handling works:', error.message);
  }
}

// Run all tests
export async function runAPITests() {
  console.log('🚀 Running API Tests...');
  
  await testAPIConnection();
  await testAuthEndpoints();
  
  console.log('🏁 API Tests Complete');
}

// Auto-run tests in development (disabled due to CORS issues)
// if (import.meta.env.DEV) {
//   runAPITests();
// }


  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check successful:', response.data.message);
  } catch (error) {
    console.log('❌ Health check failed:', error.response?.data?.message || error.message);
  }


// Main test function
const runTests = async () => {
  console.log('🚀 Starting Backend Tests...\n');
  
  try {
    await testHealthEndpoint();
    await testAuthentication();
    await testGetCurrentUser();
    await testGetRequests();
    
    console.log('\n✅ All tests completed!');
    console.log('\n📝 Next Steps:');
    console.log('1. Create a request as Developer');
    console.log('2. Approve/reject as Reviewer');
    console.log('3. Continue through workflow stages');
    console.log('4. Deploy as Hosting Team');
    
  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests, tokens }; 
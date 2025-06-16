const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { db } = require('./config/firebase');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Startup logs
console.log('\n🚀 Starting Insta Restaurant Bot Backend...');
console.log('----------------------------------------');

// Basic test route
app.get('/', (req, res) => {
  console.log('✅ Frontend connected to backend successfully!');
  res.json({ message: 'Welcome to Insta Restaurant Bot API' });
});

// Test Firebase connection
app.get('/test-firebase', async (req, res) => {
  try {
    // Try to write a test document
    const testRef = await db.collection('test').add({
      message: 'Test connection',
      timestamp: new Date().toISOString()
    });

    // Read the document back
    const doc = await testRef.get();
    
    console.log('✅ Firebase DB operation successful!');
    console.log('📄 Test document created with ID:', testRef.id);
    
    res.json({
      success: true,
      data: {
        id: testRef.id,
        ...doc.data()
      }
    });
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log('✅ Firebase Admin SDK initialized');
  console.log('----------------------------------------');
  console.log('🌐 API Endpoints:');
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/test-firebase`);
  console.log('----------------------------------------\n');
}); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // To hash passwords
const User = require('../models/user'); // Adjust the path if needed

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Create sample users
async function createSampleUsers() {
  try {
    const users = [
      // Admins
      {
        firstName: 'Admin',
        lastName: 'One',
        email: 'admin1@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
        verified: true,
      },
      {
        firstName: 'Admin',
        lastName: 'Two',
        email: 'admin2@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
        verified: true,
      },

      // Customers
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'customer',
        verified: true,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'customer',
        verified: true,
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'customer',
        verified: false,
      },
    ];

    await User.insertMany(users);
    console.log('🎉 Sample users created successfully!');
  } catch (error) {
    console.error('Error creating sample users:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Run it
createSampleUsers();

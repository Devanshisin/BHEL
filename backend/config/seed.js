const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Request = require('../models/Request');
const connectDB = require('./database');

const seedUsers = async () => {
  try {
    await connectDB();

    // Check if users already exist
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log('Users already seeded. Skipping user seeding...');
    } else {
      const users = [
        {
          email: 'dev@bhel.com',
          password: 'dev123',
          role: 'Developer',
          name: 'John Developer',
          department: 'Software Development'
        },
        {
          email: 'rev@bhel.com',
          password: 'rev123',
          role: 'Reviewer',
          name: 'Sarah Reviewer',
          department: 'Code Review'
        },
        {
          email: 'hod@bhel.com',
          password: 'hod123',
          role: 'HOD',
          name: 'Mike HOD',
          department: 'Head of Department'
        },
        {
          email: 'dtg@bhel.com',
          password: 'dtg123',
          role: 'DTG',
          name: 'Lisa DTG',
          department: 'Digital Technology Group'
        },
        {
          email: 'cdt@bhel.com',
          password: 'cdt123',
          role: 'CDT',
          name: 'David CDT',
          department: 'Central Development Team'
        },
        {
          email: 'host@bhel.com',
          password: 'host123',
          role: 'HostingTeam',
          name: 'Alex Hosting',
          department: 'Hosting Team'
        },
        {
          email: 'admin@bhel.com',
          password: 'admin123',
          role: 'Admin',
          name: 'Admin User',
          department: 'Administration'
        }
      ];

      for (const userData of users) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const user = new User({
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          name: userData.name,
          department: userData.department
        });

        await user.save();
        console.log(`Created user: ${userData.email} (${userData.role})`);
      }

      console.log('All users seeded successfully!');
    }


  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};


// Helper functions

seedUsers();
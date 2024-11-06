// seedDatabase.js
const sequelize = require('./config/database'); // Adjust path to your database config
const { User, Property, Tour, Offer } = require('./models'); // Adjust paths to your models

const seedDatabase = async () => {
  try {
    // Sync database (clear out tables and recreate them)
    await sequelize.sync({ force: true });
    console.log("Database synced!");

    // Create users (buyers and a seller)
    const seller = await User.create({
      email: 'seller@example.com',
      password: 'password123',
      userType: 'seller'
    });
    
    const buyer1 = await User.create({
      email: 'buyer1@example.com',
      password: 'password123',
      userType: 'buyer',
      preApprovalLimit: 500000
    });
    
    const buyer2 = await User.create({
      email: 'buyer2@example.com',
      password: 'password123',
      userType: 'buyer',
      preApprovalLimit: 300000
    });

    console.log("Users seeded!");

    // Create properties
    const property1 = await Property.create({
      title: 'Luxury Villa',
      description: 'A beautiful villa with stunning views.',
      price: 750000,
      address: '123 Main St',
      city: 'Newark',
      state: 'NJ',
      zip: '07101',
      viewingOption: 'schedule tour',
      userId: seller.id
    });
    
    const property2 = await Property.create({
      title: 'Modern Townhouse',
      description: 'A cozy townhouse in a nice neighborhood.',
      price: 250000,
      address: '456 Maple Ave',
      city: 'Cherry Hill',
      state: 'NJ',
      zip: '08002',
      viewingOption: 'get code now',
      userId: seller.id
    });

    console.log("Properties seeded!");

    // Create tours
    await Tour.create({
      propertyId: property1.id,
      userId: buyer1.id,
      scheduledDate: new Date('2024-11-01T15:30:00'),
      status: 'pending'
    });
    
    await Tour.create({
      propertyId: property2.id,
      userId: buyer2.id,
      scheduledDate: new Date('2024-11-02T10:00:00'),
      status: 'confirmed'
    });

    console.log("Tours seeded!");

    // Create offers
    await Offer.create({
      propertyId: property1.id,
      buyerId: buyer1.id,
      offerAmount: 700000,
      status: 'submitted'
    });
    
    await Offer.create({
      propertyId: property2.id,
      buyerId: buyer2.id,
      offerAmount: 240000,
      status: 'submitted'
    });

    console.log("Offers seeded!");

    console.log("Seed data successfully created!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    sequelize.close();
  }
};

// Run the seed function
seedDatabase();

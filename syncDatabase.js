const { sequelize } = require('./models');

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synced successfully!');
    process.exit();
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
    process.exit(1);
  });

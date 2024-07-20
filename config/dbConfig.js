const { Sequelize } = require('sequelize');

// Construct connection string using environment variables
const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialectOptions: {
    options: {
      encrypt: true, // Use encryption for the connection
      trustServerCertificate: false // Change to true if needed
    }
  }
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connect };

require('dotenv').config();

module.exports = {
  dev: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'postgres',
  },
  // Puedes agregar test y production si lo necesitas
};
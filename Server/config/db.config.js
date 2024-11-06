module.exports = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'postgres',
  PASSWORD: process.env.DB_PASSWORD || 'admin',
  DB: process.env.DB_NAME || 'testdb',
  dialect: 'mysql',
};

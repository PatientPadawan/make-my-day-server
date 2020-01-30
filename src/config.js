module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_ORIGIN: process.env.REACT_APP_CLIENT_ORIGIN,
  CLIENT_ID: process.env.CLIENT_ID,
  ISSUER: process.env.ISSUER,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_CLIENT_ID: process.env.EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,
  EMAIL_CLIENT_REFRESH_TOKEN: process.env.EMAIL_CLIENT_REFRESH_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
};

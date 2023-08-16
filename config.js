require('dotenv').config();

const {
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_NAME = 'mestodb',
  JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N',
} = process.env;

const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = {
  DB_URL,
  JWT_SECRET,
};

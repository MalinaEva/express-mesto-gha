require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { sendResponse } = require('./utils/sendResponse');
const { NOT_FOUND, NOT_FOUND_MESSAGE } = require('./utils/statuses');
const { login, createUser } = require('./controllers/users');
const validateRequest = require('./middleware/validateRequest');
const { loginValidationSchema, registerValidationSchema } = require('./validations/userValidations');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.post('/signin', validateRequest(loginValidationSchema), login);
app.post('/signup', validateRequest(registerValidationSchema), createUser);

app.use((req, res) => sendResponse(res, { message: NOT_FOUND_MESSAGE }, NOT_FOUND));

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

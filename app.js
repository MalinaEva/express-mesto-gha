const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64bd1060158e9e5f53358f60'
  };
  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

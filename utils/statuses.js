const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const CONFLICT = 409;

const CARD_NOT_FOUND = 'Карточка не найдена';
const CARD_DELETED = 'Карточка удалена';
const USER_NOT_FOUND = 'Пользователь не найден';
const NOT_VALID_DATA = 'Переданы некорректные данные';
const NOT_FOUND_MESSAGE = 'Страница не найдена';
const UNAUTHORIZED_MESSAGE = 'Необходима авторизация';
const FORBIDDEN_MESSAGE = 'Недостаточно прав';
const CONFLICT_MESSAGE = 'Пользователь с таким email уже существует';
const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  CARD_NOT_FOUND,
  CARD_DELETED,
  USER_NOT_FOUND,
  NOT_VALID_DATA,
  NOT_FOUND_MESSAGE,
  UNAUTHORIZED,
  UNAUTHORIZED_MESSAGE,
  FORBIDDEN,
  FORBIDDEN_MESSAGE,
  CONFLICT,
  CONFLICT_MESSAGE,
};

class AuthError extends Error {
  constructor(message = 'Неправильная почта или пароль', statusCode = 401) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

module.exports = AuthError;

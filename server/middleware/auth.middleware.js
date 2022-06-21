const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.get('secretKey'));
      req.user = decoded;
      next();
    } catch {
      try {
        const token = req.body.headers.Authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.get('secretKey'));
        req.user = decoded;
        next();
      } catch {
        return res.status(401).json({ message: 'Ошибка аутентификации: отсутствует токен.' });
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Ошибка аутентификации: непредвиденная ошибка.' });
  }
};

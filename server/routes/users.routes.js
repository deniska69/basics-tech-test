const Router = require('express');
const router = new Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

const User = require('../models/User');

router.post(
  '/registration',
  [
    check('email', 'Некоректный Email.').isEmail(),
    check('password', 'Пароль должен быть длиннее 3 и короче 12 символов.').isLength({ min: 3, max: 12 }),
    check('name', 'Некоректное или слишком короткое имя.').isString().isLength({ min: 3, max: 30 }),
    check('date_of_birth', 'Некоректная дата рождения.').isISO8601().toDate(),
    check('gender').custom((value, { req }) => {
      if (value !== 'male' && value !== 'female') {
        throw new Error('Некоректно указан пол.');
      }
      return true;
    }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log('\nОшибка регистрации:\n', errors.errors);
        return res.status(400).json({ message: 'Ошибка регистрации. Проверьте поля на корректность заполнения.', errors });
      }

      const { email, password, name, date_of_birth, gender } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: `Пользователь с эл.почтой ${email} уже существует.` });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashPassword, name, date_of_birth, gender });

      await user.save();

      return res.json({ message: `Вы успешно зарегистрировались.` });
    } catch (e) {
      res.status(400).send({ message: 'Error: api/registration' });
    }
  }
);

module.exports = router;
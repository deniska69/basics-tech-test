const Router = require('express');
const router = new Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const mongoose = require('mongoose');

const User = require('../models/User');

const SECRET_KEY = config.get('secretKey');

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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: `Пользователь с эл.почтой ${email} не найден.` });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    res.status(400).send({ message: 'Error: api/login' });
  }
});

router.get('/auth', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        date_of_birth: user.date_of_birth,
        gender: user.gender,
      },
    });
  } catch (e) {
    res.status(400).send({ message: 'Error: api/auth' });
  }
});

router.get('/allUsers', authMiddleware, async (req, res) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.user.id } },
      {
        avatar: 1,
        name: 1,
        date_of_birth: 1,
      }
    );

    return res.json({ users });
  } catch (e) {
    res.status(400).send({ message: 'Error: api/allUsers' });
  }
});

router.put('/updateProfile', authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({ message: 'Ошибка в ID авторизованного пользователя.', errors });
    }
    const { email, password, name, date_of_birth, gender } = req.query;

    const user = await User.findOne({ _id: id });

    if (email != '' && email != undefined) {
      user.email = email;
    } else {
      return res.status(400).json({ message: 'Некоректный Email.', errors });
    }

    if (password != '' && password != undefined) {
      if (password.length > 3 && password.length < 13) {
        user.password = await bcrypt.hash(password, 8);
      } else {
        return res.status(400).json({ message: 'Пароль должен быть длиннее 3 и короче 13 символов.', errors });
      }
    }

    if (name != '' && name != undefined && name.length > 3 && name.length < 31) {
      user.name = name;
    } else {
      return res.status(400).json({ message: 'Некоректное или слишком короткое имя.', errors });
    }

    if (date_of_birth != '' && date_of_birth != undefined) {
      user.date_of_birth = date_of_birth;
    } else {
      return res.status(400).json({ message: 'Некоректная дата рождения.', errors });
    }

    if (gender == 'male' || gender == 'female') {
      user.gender = gender;
    } else {
      return res.status(400).json({ message: 'Некоректно указан пол.', errors });
    }

    await user.save();

    return res.json({ message: `Данные профиля успешно обновлены.`, user });
  } catch (e) {
    res.status(400).send({ message: 'Error: api/updateUser' });
  }
});

module.exports = router;

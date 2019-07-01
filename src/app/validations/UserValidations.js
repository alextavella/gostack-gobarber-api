import * as Yup from 'yup';

import User from '../models/User';

class UserValidation {
  async create(req, res, next) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).send('User already exists.');
    }

    return next();
  }

  async edit(req, res, next) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    return next();
  }

  async field_edit(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    return next();
  }

  async get(req, res, next) {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(400).send('User does not exists.');
    }

    req.user = user;

    return next();
  }
}

export default new UserValidation();

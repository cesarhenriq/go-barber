import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.json({});
    return res.json(user);
  }

  async create(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists)
      return res.status(400).json({ error: 'User already exists' });

    const { id, name, email, provider } = await User.create(req.body);
    return res.status(201).json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();

const { User } = require('../models/user');

exports.getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

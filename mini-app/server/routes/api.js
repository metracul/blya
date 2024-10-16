const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/save', async (req, res) => {
  const { userId, balance } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId обязателен' });
  }

  try {
    const [user, created] = await User.findOrCreate({
      where: { userId },
      defaults: { balance },
    });

    if (!created) {
      user.balance = balance;
      await user.save();
    }

    res.json({ status: 'success', data: user });
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.get('/load', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId обязателен' });
  }

  try {
    const user = await User.findOne({ where: { userId } });
    if (user) {
      res.json({ status: 'success', data: user });
    } else {
      res.json({ status: 'not found', data: { balance: 0 } });
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;

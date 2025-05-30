const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('Registro intentado:', { email, password });

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('Usuario ya existe:', email);
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    user = new User({
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();
    console.log('Usuario registrado:', email);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error('Error en registro:', err.message);
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Inicio de sesión intentado:', { email });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado:', email);
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Contraseña incorrecta para:', email);
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Inicio de sesión exitoso' });
  } catch (err) {
    console.error('Error en inicio de sesión:', err.message);
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
});

module.exports = router;
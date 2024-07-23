import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../libs/jwt.js';
// import 'dotenv/config';
// import dotenv from 'dotenv';
// dotenv.config();

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1ro checkeo si existe el email
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json({ message: "The email already exists" });

    const passwordHash = await bcrypt.hash(password, 10); // 10 es el salt, es el num. de veces que se ejecuta el algor.

    const newUser = new User({ username, email, password: passwordHash }); // aún no está el createdAt
    const savedUser = await newUser.save(); // Aquí en el save() se añade el createdAt

    console.log("auth.controller signup -> antes del createAccessToken");
    const token = await createAccessToken({ id: savedUser._id }); // generamos token

    // res.cookie('token', token);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'None', // Necesario para solicitudes cruzadas
      secure: true // Recomendado para producción con HTTPS
    });
    console.log('toooooooooken auth.controller signup -> ', token);
    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check email at db
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Invalid credentials" });

    // check the password at db
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    //create the token
    const token = await createAccessToken({ id: userFound._id });
    if (token) {
      // res.cookie("token", token);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'None', // Necesario para solicitudes cruzadas
        secure: true // Recomendado para producción con HTTPS
      });
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
      })
    } else {
      console.log("Error con el token");
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
}

// Cada que la page carga de nuevo se verifica si existe token y si existe user(db) de ese token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  console.log('token auth.controller - verifyToken - req.cookies -> ', req.cookies);
  console.log('token auth.controller - verifyToken - token -> ', token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  });
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "user not founded" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  });
}
import jwt from 'jsonwebtoken';
// import 'dotenv/config';
// import dotenv from 'dotenv';
// dotenv.config();

// generamos un token para la auth
export function createAccessToken(payload) {
  console.log('jwt.js - payload-', payload);
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        console.log('jwt.js createAccesToken - token', token);
        resolve(token);
      }
    )
  })
}
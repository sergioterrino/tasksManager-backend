import jwt from 'jsonwebtoken';
// import 'dotenv/config';
// import dotenv from 'dotenv';
// dotenv.config();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not token. Authorization denied" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403).json({ message: "Invalid token"});

    req.user = user // save en la req, ya que así las demás request tendran los datos del user
    
    next();
  });
}

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // comparamos el schema con el body que le pasemos en la req
    next();
  } catch (error) {
    return res.status(400).json(error.errors.map(err => err.message));
  }
}
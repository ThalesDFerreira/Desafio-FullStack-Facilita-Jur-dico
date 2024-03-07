require('dotenv').config();
const status = require('http-status');

const bodyClientsValidation = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: 'Body não pode estar vazio!' });
  }
  if (!req.body.name) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: `Body não possui a chave "name" ou está vazia!` });
  }
  if (!req.body.email) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: `Body não possui a chave "email" ou está vazia!` });
  }
  if (!req.body.phone) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: `Body não possui a chave "phone" ou está vazia!` });
  }
  if (!req.body.coordinate_x) {
    return res.status(status.BAD_REQUEST).json({
      message: `Body não possui a chave "coordinate_x" ou está vazia!`,
    });
  }
  if (!req.body.coordinate_y) {
    return res.status(status.BAD_REQUEST).json({
      message: `Body não possui a chave "coordinate_y" ou está vazia!`,
    });
  }
  next();
};

module.exports = {
  bodyClientsValidation,
};

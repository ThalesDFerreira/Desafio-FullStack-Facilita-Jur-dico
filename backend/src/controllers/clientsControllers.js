const status = require('http-status');
const ModelClients = require('../database/models/clients');
const {
  getClientsServices,
  insertClientsServices,
  editClientsServices,
  deleteClientsServices,
} = require('../services/clientServices');

const getClientsControllers = async (req, res) => {
  try {
    const clients = await getClientsServices();
    return res.status(status.OK).json(clients);
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ erro: error.message });
  }
};

const insertClientsControllers = async (req, res) => {
  const findClient = await ModelClients.findOne({
    where: { name: req.body.name },
  });

  try {
    if (findClient) {
      return res
        .status(status.CONFLICT)
        .json({ message: 'Usuário já cadastrado!' });
    } else {
      const result = await insertClientsServices(req);
      return res.status(status.CREATED).json({
        message: `Usuario ${result.dataValues.name} cadastrado com sucesso!`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ erro: error.message });
  }
};

const editClientsControllers = async (req, res) => {
  const findClient = await ModelClients.findOne({
    where: { id: req.body.id },
  });

  try {
    if (
      findClient.dataValues.name === req.body.name &&
      findClient.dataValues.email === req.body.email &&
      findClient.dataValues.phone === req.body.phone &&
      findClient.dataValues.coordinate_x === req.body.coordinate_x &&
      findClient.dataValues.coordinate_y === req.body.coordinate_y
    ) {
      return res.status(status.CONFLICT).json({
        message:
          'Nome, email, phone, coordinate_x e coordinate_y não alterados!',
      });
    } else {
      await editClientsServices(req);
      return res.status(status.ACCEPTED).json({
        message: `Usuario alterado com sucesso!`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ erro: error.message });
  }
};

const deleteClientsControllers = async (req, res) => {
  try {
    await deleteClientsServices(req);
    return res.status(status.OK).json({
      message: 'Usuário deletado com sucesso!',
    });
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ erro: error.message });
  }
};

module.exports = {
  getClientsControllers,
  insertClientsControllers,
  editClientsControllers,
  deleteClientsControllers,
};

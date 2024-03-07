const ModelClients = require('../database/models/clients');

const getClientsServices = async () => {
  const result = await ModelClients.findAll();
  return result;
};

const insertClientsServices = async (req) => {
  const result = await ModelClients.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    coordinate_x: req.body.coordinate_x,
    coordinate_y: req.body.coordinate_y,
  });
  return result;
};

const editClientsServices = async (req) => {
  const result = await ModelClients.update(
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.role,
      coordinate_x: req.body.coordinate_x,
      coordinate_y: req.body.coordinate_y,
    },
    { where: { id: req.body.id } }
  );
  return result;
};

const deleteClientsServices = async (req) => {
  const result = await ModelClients.destroy({ where: { id: req.query.id } });
  return result;
};

module.exports = {
  getClientsServices,
  insertClientsServices,
  editClientsServices,
  deleteClientsServices,
};

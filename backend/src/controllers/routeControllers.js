const status = require('http-status');
const { routeClientsServices } = require('../services/routeClientServices');

const routeClientsControllers = async (req, res) => {
  try {
    const result = await routeClientsServices(req);
    return res.status(status.CREATED).json(result);
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ erro: error.message });
  }
};

module.exports = {
  routeClientsControllers,
};

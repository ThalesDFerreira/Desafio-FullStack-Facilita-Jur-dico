const router = require('express').Router();
const express = require('express');
const status = require('http-status');

const { bodyClientsValidation } = require('../middlewares/validations');

const {
  getClientsControllers,
  insertClientsControllers,
  editClientsControllers,
  deleteClientsControllers,
} = require('../controllers/clientsControllers');

const {
  routeClientsControllers,
} = require('../controllers/routeControllers');

router.get('/', (req, res) => {
  try {
    return res.status(status.OK).json({
      message: 'Server ready, waiting action !!!',
    });
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
});

// CLIENTES
router.get('/clientes', getClientsControllers);
router.post('/clientes', bodyClientsValidation, insertClientsControllers);
router.put('/clientes', bodyClientsValidation, editClientsControllers);
router.delete('/clientes', deleteClientsControllers);

// VISITAÇÃO
router.post('/vistar', routeClientsControllers);

module.exports = router;

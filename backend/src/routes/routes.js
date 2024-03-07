const router = require('express').Router();
const express = require('express');
const status = require('http-status');

// const {
//   bodyUsersValidation,
//   bodyEditUsersValidation,
// } = require('../middlewares/validations');

const {
  getClientsControllers,
  insertClientsControllers,
  editClientsControllers,
  deleteClientsControllers,
} = require('../controllers/clientsControllers');


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

// USUARIOS
router.get('/usuarios', getClientsControllers);
router.post('/usuarios', insertClientsControllers);
router.put('/usuarios', editClientsControllers);
router.delete('/usuarios', deleteClientsControllers);

module.exports = router;
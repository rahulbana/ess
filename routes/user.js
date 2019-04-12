const express = require('express');
const { loginCtrl } = require('../controller/loginCtrl')

const apiRoutes = express.Router();

apiRoutes.post('/login', loginCtrl)

module.exports = { apiRoutes }
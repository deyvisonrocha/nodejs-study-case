const express = require('express')
const router = express.Router()
const UsersController = require('../app/api/controllers/UsersController')

router.post('/register', UsersController.create)
router.post('/authenticate', UsersController.authenticate)

module.exports = router

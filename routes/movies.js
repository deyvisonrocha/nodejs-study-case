const express = require('express')
const router = express.Router()
const MoviesController = require('../app/api/controllers/MoviesController')

router.get('/', MoviesController.getAll)
router.post('/', MoviesController.create)
router.get('/:movieId', MoviesController.getById)
router.put('/:movieId', MoviesController.updateById)
router.delete('/:movieId', MoviesController.deleteById)

module.exports = router

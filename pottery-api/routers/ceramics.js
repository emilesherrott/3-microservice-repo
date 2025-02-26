const { Router } = require('express')

const ceramicsController = require('../controllers/ceramics')

const ceramicsRouter = Router()

ceramicsRouter.get("/", ceramicsController.index)
ceramicsRouter.get("/visual", ceramicsController.generateVisualisation)

module.exports = {
    ceramicsRouter
}
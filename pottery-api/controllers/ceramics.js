const axios = require('axios')

const { Ceramic } = require('../models/Ceramic')

const index = async (req, res) => {
    try {
        const ceramics = await Ceramic.getAll()
        res.status(200).json(ceramics)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


const generateVisualisation = async (req, res) => {
    try {
        const pieceAndPrice = await Ceramic.getPieceAndPrice()
        const data = {
            x: pieceAndPrice.map(i => i.piece),
            y: pieceAndPrice.map(i => i.price),
        }

        const response = await axios.post('http://pottery-python:3001/generate-visualisation', data)

        res.status(200).json({ "html": response.data.visualisation_html })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    index,
    generateVisualisation
}
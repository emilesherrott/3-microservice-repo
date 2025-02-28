const axios = require("axios")

const { Sale } = require("../models/Sale")
const { aggregateSalesData } = require("../helpers/aggregator")

const salesInfo = async (req, res) => {
  try {
    const pottersId = req.pottersId
    const itemId = req.body.id
    const salesData = await Sale.getSalesInfo(pottersId, itemId)

    console.log("salesData", salesData)
    const aggregatedData = aggregateSalesData(salesData)
    console.log("aggregatedData", aggregatedData)

    const response = await axios.post("http://pottery-python:3001/generate-visualisation", aggregatedData)

    console.log("controller response", response)

    res.status(200).json({
      success: true,
      visualisatinon: response.data,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const styleInfo = async (req, res) => {
  try {
    const pottersId = req.pottersId
    const styleSaleResults = await Sale.styleInfo(pottersId)
    console.log("controller styleInfo", styleSaleResults)


    const aggregatedData = styleSaleResults.reduce((acc, sale) => {
      acc[sale.style] = (acc[sale.style] || 0) + sale.saleNumber;      
      return acc;
    }, {});

    const formattedData = {
      styles: Object.keys(aggregatedData), 
      sales: Object.values(aggregatedData), 
    };

    const response = await axios.post("http://pottery-python:3001/generate-style-visualisation", formattedData);
    res.status(200).json({
      success: true,
      visualisatinon: response.data
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const makeSale = async (req, res) => {
  try {
    const ownersId = req.ownersId
    const data = req.body
    console.log("controller makeSale", ownersId)
    const purchase = await Sale.makeSale(ownersId, data)
    res.status(200).json({
      success: true,
      purchaseInfo: purchase,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  salesInfo,
  styleInfo,
  makeSale,
}

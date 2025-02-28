const aggregateSalesData = (salesData) => {
    const aggregated = {};
  
    salesData.forEach(sale => {
      const { piece, saleTime, saleNumber } = sale;
  
      // Create a unique key for each piece and saleTime combination
      const key = `${piece}-${saleTime}`;
  
      // If this combination doesn't exist in the aggregated object, initialize it
      if (!aggregated[key]) {
        aggregated[key] = {
          piece,
          saleTime,
          totalSales: 0,
        };
      }
  
      // Add the sales number to the total for that piece and saleTime combination
      aggregated[key].totalSales += saleNumber;
    });
  
    // Convert aggregated data into an array format that is easy to send to Python
    const x = [];
    const y = [];
  
    Object.values(aggregated).forEach(item => {
      x.push(`${item.piece} (${item.saleTime})`);  // X-axis: Piece and SaleTime as a combined label
      y.push(item.totalSales);                    // Y-axis: Total sales for that piece
    });
  
    return { x, y };
  };

  module.exports = {
    aggregateSalesData
  }
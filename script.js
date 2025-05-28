// script.js

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Sort by TotalSales (highest first)
    data.sort((a, b) => b.TotalSales - a.TotalSales);

    const products = data.map(item => item.Product);
    const totalSales = data.map(item => item.TotalSales);
    const totalValue = data.map(item => item.TotalValue);
    const hoverText = data.map(item =>
      `Product: ${item.Product}<br>` +
      `TotalSales: ${item.TotalSales}<br>` +
      `TotalValue: ${item.TotalValue}`
    );

    const trace = {
      x: products,
      y: totalSales,
      type: 'bar',
      text: hoverText,
      hoverinfo: 'text',
      marker: {
        color: totalValue,              // Map to TotalValue
        colorscale: 'OrRd',             // Color scale (do not reverse)
        cmin: 10,                       // Lock minimum value of scale
        cmax: 40,                       // Lock maximum value of scale
        colorbar: {
          title: 'TotalValue',
          thickness: 15,
          len: 0.6
        }
      }
    };

    const layout = {
      title: 'Interactive Product Sales Chart',
      xaxis: {
        title: 'Product',
        tickfont: { size: 14 }
      },
      yaxis: {
        title: 'Total Sales',
        tickfont: { size: 14 }
      },
      margin: { t: 50, b: 80, l: 80, r: 60 },
      plot_bgcolor: '#fff',
      paper_bgcolor: '#fff'
    };

    Plotly.newPlot('bar-chart', [trace], layout);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

from flask import Flask, jsonify, request
import matplotlib.pyplot as plt
import plotly.graph_objs as go
import io
import base64

app = Flask(__name__)

@app.route("/generate-visualisation", methods=["POST"])
def generate_visualisation():
    # Getting the aggregated sales data from the request
    data = request.json

    # Extracting the x and y values (you may need to adjust this part)
    x = data.get('x', [])
    y = data.get('y', [])

    # Create a Matplotlib figure and axis
    fig, ax = plt.subplots()

    # Create a bar chart
    ax.bar(x, y)

    # Set chart titles and labels
    ax.set_title("Sales per Ceramic Piece over Time")
    ax.set_xlabel("Ceramic Piece Name and Sale Time")
    ax.set_ylabel("Total Sales")

    # Convert the Matplotlib figure to a Plotly figure
    plotly_fig = go.Figure(data=[go.Bar(x=x, y=y)])

    # Convert the Plotly figure to HTML to return it
    fig_html = plotly_fig.to_html(full_html=False, include_plotlyjs='cdn')

    return jsonify({'visualisation_html': fig_html})

@app.route("/generate-style-visualisation", methods=["POST"])
def generate_style_visualisation():
    # Getting the aggregated sales data from the request
    data = request.json
    styles = data.get('styles', [])
    sales = data.get('sales', [])

    if not styles or not sales or len(styles) != len(sales):
        return jsonify({'error': 'Invalid data received'}), 400

    # Create a pie chart using Matplotlib
    fig, ax = plt.subplots()
    colors = ['#636efa', '#6e7bff', '#7c89ff', '#8a95ff', '#99a1ff']
    ax.pie(sales, labels=styles, autopct='%1.1f%%', startangle=90, colors=colors[:len(styles)])
    ax.axis('equal')  # Equal aspect ratio ensures that pie chart is drawn as a circle.

    # Save the chart to a BytesIO object and convert it to base64 for embedding in HTML
    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    img_base64 = base64.b64encode(img_bytes.getvalue()).decode('utf-8')

    # Return the pie chart as an HTML image
    pie_chart_html = f'<img src="data:image/png;base64,{img_base64}" />'

    return jsonify({'visualisation_html': pie_chart_html})



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)

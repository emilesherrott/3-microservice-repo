from flask import Flask, jsonify, request
import plotly.graph_objs as go

app = Flask(__name__)

@app.route("/generate-visualisation", methods=["POST"])
def generate_visualisation():

    data = request.json

    fig = go.Figure(data=[go.Bar(x=data['x'], y=data['y'])])

    fig.update_layout(
        xaxis_title='Ceramic Piece Name',  
        yaxis_title='Price in £'      
    )


    fig_html = fig.to_html(full_html=False, include_plotlyjs='cdn')

    return jsonify({'visualisation_html': fig_html})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)

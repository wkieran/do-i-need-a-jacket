import os
import requests
import config
from flask import Flask, render_template, request, jsonify, abort

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather')
def weather():
    city = request.args.get('city')
    if not city:
        abort(400)
    url = f'https://api.weatherapi.com/v1/current.json?key={config.api_key}&q={city}'
    try:
        response = requests.get(url).json()
    except ValueError:
        abort(404)

    try:
        temperature = response['current']['temp_f']
    except KeyError:
        abort(404)
    return jsonify({'temperature': temperature})

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'City not found'}), 404

if __name__ == '__main__':
    app.run()
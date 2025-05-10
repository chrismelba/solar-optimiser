"""Solar Optimiser Add-on."""
import os
import json
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import hassio

app = Flask(__name__, static_folder='static')
CORS(app)

# Initialize Home Assistant API client
hass = hassio.Hassio()

# Configuration file path
CONFIG_FILE = '/data/options.json'

@app.route('/')
def serve_index():
    """Serve the main page."""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files."""
    return send_from_directory(app.static_folder, path)

@app.route('/api/entities', methods=['GET'])
def get_entities():
    """Get all available entities from Home Assistant."""
    try:
        states = hass.get_states()
        return jsonify(states)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/entity/<entity_id>', methods=['GET'])
def get_entity(entity_id):
    """Get specific entity state."""
    try:
        state = hass.get_state(entity_id)
        return jsonify(state)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/config', methods=['GET'])
def get_config():
    """Get current configuration."""
    try:
        if os.path.exists(CONFIG_FILE):
            with open(CONFIG_FILE, 'r') as f:
                return jsonify(json.load(f))
        return jsonify({})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/config', methods=['POST'])
def save_config():
    """Save configuration."""
    try:
        config = request.json
        with open(CONFIG_FILE, 'w') as f:
            json.dump(config, f)
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8099) 
# Solar Optimiser

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

A Home Assistant add-on that helps optimize solar panel usage and energy management.

## Installation

1. In Home Assistant, navigate to **Settings** → **Add-ons** → **Add-on Store**
2. Click the menu (⋮) in the top right
3. Select **Repositories**
4. Add this repository URL: `https://github.com/chrismelba/solar-optimiser`
5. Click **Add**
6. The add-on will appear in the add-on store. Click **Install**

## Features

- Web-based interface for entity selection
- Solar optimization algorithms
- Energy usage monitoring
- Customizable settings

## Configuration

The add-on can be configured through the web interface at `http://your-home-assistant:8099`:

1. Select your solar generation entity
2. Select your grid power entity
3. Select your battery percentage entity
4. Set your battery capacity
5. Click Save to persist your configuration

## Usage

1. Install and start the add-on
2. Access the web interface at `http://your-home-assistant:8099`
3. Select the entities you want to monitor and optimize
4. Configure optimization settings
5. Monitor and adjust as needed

## Development

### Building the Add-on

1. Clone this repository
2. Make your changes
3. Build the add-on:
   ```bash
   cd solar-optimiser
   docker build .
   ```

### Frontend Development

The frontend is built with React and can be developed locally:

1. Navigate to the frontend directory:
   ```bash
   cd solar-optimiser/app/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Support

If you have any issues or questions, please [open an issue](https://github.com/chrismelba/solar-optimiser/issues).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Solar Optimiser

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

A Home Assistant add-on that helps optimize solar panel usage and energy management.

## Features

- Web-based interface for entity selection
- Solar optimization algorithms
- Energy usage monitoring
- Customizable settings

## Installation

### Add-on Installation

1. Add this repository to your Home Assistant add-ons:
   - Go to Supervisor > Add-on Store
   - Click the three dots in the top right
   - Click "Add repository"
   - Enter the URL of this repository
2. Install the "Solar Optimiser" add-on
3. Start the add-on
4. Access the web interface at `http://your-home-assistant:8099`

## Configuration

The add-on can be configured through the Home Assistant add-on configuration panel. Available options:

```yaml
# Add configuration options here
```

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
   cd addon
   docker build -t solar_optimiser .
   ```

### Frontend Development

The frontend is built with React and can be developed locally:

1. Navigate to the frontend directory:
   ```bash
   cd addon/app/frontend
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

If you have any issues or questions, please [open an issue](https://github.com/yourusername/solar-optimiser/issues).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

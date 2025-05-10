# Solar Optimiser Home Assistant Addon

A simple web server addon for Home Assistant that displays "Hello World".

## Installation

1. Add this repository to your Home Assistant instance:
   - Go to Settings > Add-ons > Add-on Store
   - Click the three dots in the top right
   - Click "Repositories"
   - Add `https://github.com/chrismelba/solar-optimiser`

2. Install the "Solar Optimiser" addon from the addon store

## Usage

1. Start the addon from the Home Assistant addon page
2. The web interface will be available at `http://[YOUR_HOME_ASSISTANT_IP]:8080`

## Development

This addon is built using:
- Python 3
- Home Assistant Addon Base Image
- Simple HTTP Server

## Container Registry

The addon is automatically built and published to GitHub Container Registry (ghcr.io) for the amd64 architecture. You can find the container at:

```
ghcr.io/chrismelba/solar-optimiser
```

The container is built and pushed automatically when:
- Changes are pushed to the main branch
- A new release is created
- The workflow is manually triggered

## License

MIT License 
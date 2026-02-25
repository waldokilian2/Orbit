#!/bin/sh
set -e

# Check if config file exists, if not copy the default
if [ ! -f /app/config/services.json ]; then
    echo "Config file not found, copying default config..."
    cp /app/default-config/services.json /app/config/services.json
fi

# Start the application
exec node server.js

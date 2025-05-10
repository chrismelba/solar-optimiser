ARG BUILD_FROM
FROM $BUILD_FROM

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
RUN \
    apk add --no-cache \
        python3 \
        py3-pip \
        nodejs \
        npm

# Copy application files
COPY run.sh /
COPY app /app

# Install Python dependencies
RUN pip3 install --no-cache-dir -r /app/requirements.txt

# Install Node.js dependencies and build frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Make run script executable
RUN chmod a+x /run.sh

CMD [ "/run.sh" ] 
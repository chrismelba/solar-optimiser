ARG BUILD_FROM
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
RUN \
    apk add --no-cache \
        python3 \
        py3-pip \
        nodejs \
        npm \
        gcc \
        python3-dev \
        musl-dev \
        linux-headers

# Create app directory
WORKDIR /app

# Copy application files
COPY run.sh /
COPY app/requirements.txt /app/
COPY app/frontend /app/frontend

# Install Python dependencies
RUN pip3 install --upgrade pip && \
    pip3 install --no-cache-dir -r requirements.txt

# Install Node.js dependencies and build frontend
WORKDIR /app/frontend

# Debug Node.js and npm versions
RUN node --version && npm --version

# Install dependencies with verbose output
RUN npm install --verbose --legacy-peer-deps

# Build with verbose output
RUN npm run build --verbose

# Copy the built frontend to the app directory
RUN mkdir -p /app/static && \
    cp -r dist/* /app/static/

# Make run script executable
RUN chmod a+x /run.sh

CMD [ "/run.sh" ] 
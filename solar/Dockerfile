# https://developers.home-assistant.io/docs/add-ons/configuration#add-on-dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM

# Execute during the build of the image
ARG TEMPIO_VERSION BUILD_ARCH
RUN \
    curl -sSLf -o /usr/bin/tempio \
    "https://github.com/home-assistant/tempio/releases/download/${TEMPIO_VERSION}/tempio_${BUILD_ARCH}"

# Install Python and pip
RUN \
    apk add --no-cache \
        python3 \
        py3-pip

# Copy requirements first for better caching
COPY rootfs/requirements.txt /tmp/
RUN pip3 install --no-cache-dir -r /tmp/requirements.txt

# Create app directory and set permissions
RUN mkdir -p /app && \
    chmod -R 755 /app

# Copy root filesystem
COPY rootfs/run /run.sh
RUN chmod 755 /run.sh

# Copy app files
COPY rootfs/app /app/

# Set the working directory
WORKDIR /app

# Start the application
CMD [ "/run.sh" ]

# https://developers.home-assistant.io/docs/add-ons/configuration#add-on-dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM

# Execute during the build of the image
ARG TEMPIO_VERSION BUILD_ARCH
RUN \
    apk add --no-cache \
        curl \
        python3 \
        py3-pip \
    && \
    curl -sSLf -o /usr/bin/tempio \
    "https://github.com/home-assistant/tempio/releases/download/${TEMPIO_VERSION}/tempio_${BUILD_ARCH}" && \
    chmod a+x /usr/bin/tempio && \
    pip3 install flask requests

# Copy root filesystem
COPY rootfs /

# Make service scripts executable
RUN chmod a+x /usr/bin/my_program && \
    chmod a+x /etc/services.d/solar-optimiser/run && \
    chmod a+x /etc/services.d/solar-optimiser/finish

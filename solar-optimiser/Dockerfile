ARG BUILD_FROM=ghcr.io/hassio-addons/base:17.2.5
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Copy Python requirements file
COPY app/requirements.txt /tmp/

# Setup base
# hadolint ignore=DL3042
RUN \
  apk add --no-cache --virtual .build-dependencies \
    py3-pip=24.3.1-r0 \
    nodejs=20.11.1-r0 \
    npm=10.2.4-r0 \
  \
  && apk add --no-cache \
    python3=3.12.10-r0 \
    gcc=13.2.1_git20231014-r0 \
    python3-dev=3.12.10-r0 \
    musl-dev=1.2.4_git20230717-r4 \
    linux-headers=6.4-r0 \
  \
  && pip3 install -r /tmp/requirements.txt \
  \
  && find /usr/local \
    \( -type d -a -name test -o -name tests -o -name '__pycache__' \) \
    -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
    -exec rm -rf '{}' + \
  \
  && apk del --no-cache --purge .build-dependencies \
  && rm -f -r /tmp/*

# Create app directory
WORKDIR /app

# Copy application files
COPY run.sh /
COPY app/frontend /app/frontend

# Install Node.js dependencies and build frontend
WORKDIR /app/frontend
RUN npm install --verbose --legacy-peer-deps && \
    npm run build --verbose

# Copy the built frontend to the app directory
RUN mkdir -p /app/static && \
    cp -r dist/* /app/static/

# Make run script executable
RUN chmod a+x /run.sh

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_DESCRIPTION
ARG BUILD_NAME
ARG BUILD_REF
ARG BUILD_REPOSITORY
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="${BUILD_NAME}" \
    io.hass.description="${BUILD_DESCRIPTION}" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="chrismelba" \
    org.opencontainers.image.title="${BUILD_NAME}" \
    org.opencontainers.image.description="${BUILD_DESCRIPTION}" \
    org.opencontainers.image.vendor="Home Assistant Community Add-ons" \
    org.opencontainers.image.authors="chrismelba" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.url="https://github.com/chrismelba/solar-optimiser" \
    org.opencontainers.image.source="https://github.com/chrismelba/solar-optimiser" \
    org.opencontainers.image.documentation="https://github.com/chrismelba/solar-optimiser/blob/main/README.md" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}

CMD [ "/run.sh" ] 
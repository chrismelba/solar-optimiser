ARG BUILD_FROM
FROM $BUILD_FROM

# Install Python
RUN apk add --no-cache python3

# Copy application files
COPY server.py /app/
COPY run.sh /app/

# Make run script executable
RUN chmod a+x /app/run.sh

# Set working directory
WORKDIR /app

# Run the application
CMD [ "/app/run.sh" ]
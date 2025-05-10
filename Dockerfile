ARG BUILD_FROM
FROM $BUILD_FROM

# Install Python and pip
RUN apk add --no-cache python3 py3-pip

# Copy requirements first to leverage Docker cache
COPY requirements.txt /
RUN pip3 install --no-cache-dir -r /requirements.txt

# Copy application
COPY app.py /app.py

# Run the application
CMD [ "python3", "/app.py" ] 
FROM ubuntu:22.04

# Set to non interactive
ENV DEBIAN_FRONTEND=noninteractive

# Update packages and install necessary tools
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y curl build-essential python3-dev gcc libgl1-mesa-glx python3-pip git

# Set working dir
WORKDIR /LocalSlice

### LocalSlice Setup ###

# Copy app to container
COPY ./ /LocalSlice

# Install Pipenv
RUN pip install pipenv

# Install Python dependencies using pipenv
RUN pipenv install

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN npm install --force

# Expose ports for FastAPI and React
EXPOSE 8000 3000

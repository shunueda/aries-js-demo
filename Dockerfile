FROM ubuntu:latest
MAINTAINER Shun Ueda (shu225@lehigh.edu)

ENV DEBIAN_FRONTEND noninteractive

# Basic packages installation
RUN apt-get update && \
    apt-get install -y python3 python3-pip curl wget gnupg docker-compose software-properties-common ca-certificates libncurses5

# Node v18 installation
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Check Node and NPM version
RUN node -v && npm -v
RUN npm install -g yarn@latest

# Install indy-cli
RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.0g-2ubuntu4_amd64.deb
RUN dpkg -i libssl1.1_1.1.0g-2ubuntu4_amd64.deb && rm libssl1.1_1.1.0g-2ubuntu4_amd64.deb
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys CE7709D068DB5E88
RUN add-apt-repository "deb https://repo.sovrin.org/sdk/deb bionic stable"
RUN apt-get update && apt-get install -y libindy indy-cli

# Set work dir
WORKDIR /root

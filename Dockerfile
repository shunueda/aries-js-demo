FROM ubuntu:latest
MAINTAINER Shun Ueda (shu225@lehigh.edu)

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y git wget

WORKDIR "/root"
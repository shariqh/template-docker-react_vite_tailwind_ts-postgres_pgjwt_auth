# Start from the official Postgres image
FROM postgres:latest

# Install dependencies for pgjwt
RUN apt-get update && apt-get install -y \
  postgresql-server-dev-all \
  make gcc git

# Clone and install pgjwt
RUN git clone https://github.com/michelp/pgjwt.git /usr/src/pgjwt && \
  cd /usr/src/pgjwt && \
  make && \
  make install

# Set the default command
CMD ["postgres"]

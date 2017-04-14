# Modified from:
# 1) http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html
# 2) https://hackernoon.com/using-yarn-with-docker-c116ad289d56

FROM node:7.9.0

# Create a new user "app" to run a node server in
RUN useradd --user-group --create-home --shell /bin/false app && \
curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.22.0

ENV HOME=/home/app

# Separately install node_modules

COPY package.json yarn.lock $HOME/wongwan/api/

# Set permission of copied files to `app`
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/wongwan/api
RUN yarn --pure-lockfile

# CMD ["node", "."]

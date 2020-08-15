# For Development Environment
FROM node:alpine

# Work Directory
WORKDIR /usr/src/app

# Node Modules
COPY package.json yarn.lock ./

# Install node modules
RUN yarn install

# Copy app source to work directory
COPY ./ ./

# Clean exisiting compiled TS
RUN yarn prebuild

# Build project
RUN yarn build

# Build and run the app
CMD ["yarn", "start:prod"]
ARG NODE_VERSION=22.2.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

ENV NODE_ENV="production"
ARG YARN_VERSION=1.22.19
RUN npm install -g yarn@$YARN_VERSION --force

FROM base as build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY --link package-lock.json package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --link . .

FROM base

COPY --from=build /app /app

EXPOSE 4000
CMD [ "yarn", "run", "start" ]

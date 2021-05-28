<h1 align="center">🚀 Generic Store 🚀</h1>

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/codespoa/generic_store)

### Tech

- [Node.js]
- [Typescript]
- [MongoDB]
- [Docker]
- [Express]
- [Jest]

## Installation

You need have Docker and docker-compose installed in ir system, if you don't have it, i advise you to read the Docker documentation, as it show step by step.

- https://docs.docker.com/get-docker/

---

#### Install all dependencies

```sh
$ git clone https://github.com/codespoa/generic_store
$ cd generic_store
$ yarn || npm install

```

#### Configure env file

Rename .env.example for .env and complete the variables

Start the application container

#### Start the application container

```sh
$ yarn docker:up || npm run docker:up
```

with your container running, now go to <a href="http://localhost:${PORT}" target="_blank">http://localhost:${PORT}</a>

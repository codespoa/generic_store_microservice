<h1 align="center">🚀 Generic Store Product Service 🚀</h1>

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/codespoa/generic_store_microservice)

### Tech

- [Node.js]
- [Typescript]
- [MongoDB]
- [Docker]
- [Express]
- [Jest]
- [ESlint]
- [Swagger]

## Installation

You need have Docker and docker-compose installed in ir system, if you don't have it, i advise you to read the Docker documentation, as it show step by step.

- https://docs.docker.com/get-docker/

---

#### Install all dependencies

```sh
$ git clone https://github.com/codespoa/generic_store_microservice
$ cd generic_store_microservice/product_service
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

#### Testing

```sh
$ yarn test | npm run test
```

#### Code Linters

- This project use two different code linters and a another extension to the IDE, that is...

##### Eslint

- Or EcmaScriptLint, is the linter responsible to check problems in the syntax and return errors, your configurations are shared and used by others linters

##### Prettier

- This linter is used only for check the code style, they don't will check the syntax, just find a way to do the code more legible and have a integration with eslint

##### Editor Config

- That isn't a linter, just a extension to share some configs between other editors, like the format of the end of lines, identation with spaces or tabs, etc...

<img src="./book_live.png" style="display: block;margin-left: auto;margin-right: auto;width:80%" alt="Book Live"></img>

<h1 align="center">🚀 Book Live 🚀</h1>

<h5 align="center">
Hi I'am Goku</h5>

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/codespoa/book-live)

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
$ git clone https://github.com/codespoa/book-live
$ cd book-live
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

#Functionalities

### Users

[x] Criar usuario.
[x] Listar os usuários da biblioteca.
[x] Autenticar usuário

### Books

[x] Listar todos livros disponíveis
[x] Retornar dados de um livro
[x] Alugar um livro
[x] Salvar, Editar e Excluir.
[x] Usuário pode alugar um livro

# Documentation

## Routes

### Create User

#####(POST) <a href="http://localhost:${PORT}/user" target="_blank">/user</a>
return user create

###### Data in body

| Field    | Info              |
| -------- | ----------------- |
| name     | Required - String |
| email    | Required - String |
| password | Required - String |

```
{
	"name": "jonh",
	"email": "jonh@teste.com",
	"password": "123456",
}
```

---

### Login User

#####(POST) <a href="http://localhost:${PORT}/session" target="_blank">/session</a>
return user and token

###### Data in body

| Field    | Info              |
| -------- | ----------------- |
| name     | Required - String |
| password | Required - String |

```
{
	"email": "jonh@teste.com",
	"password": "123456",
}
```

---

### List all User

#####(GET) <a href="http://localhost:${PORT}/user" target="_blank">/user</a>
return all user

###### No body

---

### Create Book

#####(POST) <a href="http://localhost:${PORT}/book" target="_blank">/book</a>
return an book create

###### Data in body

| Field      | Info              |
| ---------- | ----------------- |
| name       | Required - String |
| author     | Required - String |
| value      | Required - Number |
| isbn       | Required - Number |
| publishing | Required - String |

```
{
	"name": "O livro",
  "author": "Goku",
  "value": 12.90,
  "isbn": 3443521,
  "publishing": "Autora da Luz"
}
```

---

### List all Books

#####(GET) <a href="http://localhost:${PORT}/book" target="_blank">/book</a>
return all book

###### No body

---

### Show a Books

#####(GET) <a href="http://localhost:${PORT}/book/:isbn" target="_blank">/book/:isbn</a>
show one book

###### No body

---

### Rent a Book

#####(PATCH) <a href="http://localhost:${PORT}/book/rented" target="_blank">/book/rented</a>
change status book

this is for the user to be able to rent a book, passing the user's email, the book's isbn and rented as true, the book is rented by the user, and can no longer be deleted or edited until sending the same properties and the rented as false

###### Data in body

| Field      | Info               |
| ---------- | ------------------ |
| isbn       | Required - Number  |
| user_email | Required - String  |
| rented     | Required - Boolean |

```
{
	"isbn": 12313,
	"user_email": "jonh@teste.com",
	"rented": false
}
```

---

### Delete Book

#####(DELETE) <a href="http://localhost:${PORT}/book/:isbn" target="_blank">/book/:isbn</a>
delete one book and return status 204 no content

###### No body

---

### Search a Book

#####(POST) <a href="http://localhost:${PORT}/book/search" target="_blank">/book/search</a>
search one or more books and return book

###### Data in Body

| Field      | Info              |
| ---------- | ----------------- |
| name       | Array ["String"]  |
| author     | Array ["String"]  |
| value      | Array ["Number"]  |
| isbn       | Array ["Number"]  |
| publishing | Array ["String"]  |
| rented     | Array ["Boolean"] |

```
{
	"name": ["O livro"]
	"author": ["Eduardo"],
	"value": [100, 12]
	"isbn": [632736]
	"publishing": ["O livro"]
	"rented": [true]
}
```

---

# EMS

## 📖 About 📖

An Employee Management System for managing employees and their data.

---

## 🔧 Tech Stack 🔧

- [Angular](https://angular.io/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [PostgreSQL](https://www.postgresql.org/)
- [Keycloak](https://www.keycloak.org/)
- [Docker](https://www.docker.com/)
- [Bootstrap](https://getbootstrap.com/)

## 👻 Requirements 👻

- [Docker](https://docs.docker.com/get-docker/)
- [Docker compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/)

---

## 🚀 Quickstart 🚀

Open terminal in project root

**Install dependencies**

```bash
$ npm install
```

**Start Docker cluster**

```bash
$ cd docker
$ docker compose up
```

**Start the angular project**

```bash
$ npm run start
```

**Linting and formatting**

```bash
$ npm run lint:fix
```

**Swagger**

```
http://localhost:8089/swagger
```

---

## 🚨 Firefox und keycloak-angular Inkompatibilität 🚨

Bearer Token werden unter Firefox nicht automatisch an requests angefügt, da für
Firefox ein Polyfill ausgeliefert wird und somit keycloak-angular die HTTP
request nicht abfangen kann.

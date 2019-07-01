## Stack

```
- NodeJs:
    Express
    Sucrase
    Nodemon for dev

- Docker

- Database:
    Postgres
  GUI:
    Postbird
  ORM:
    Sequelize
    Migrations


```

## Postgres

```
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

### Commands

```
docker ps
docker stop database

docker ps -all
docker start database

docker logs database
```

## Sequelize

Create Model:

```
npx sequelize migration:create --name=<name-migration>
```

Update Database:

```
npx sequelize db:migrate
```

Undo Migration:

```
npx sequelize db:migrate:undo
npx sequelize db:migrate:undo:all
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Before
Before running the app, run the next command to create the mysql Image:
```
docker run --name orders_DB --env=MYSQL_DATABASE=chat_DB --env=MYSQL_ROOT_PASSWORD=root  -p 3302:3306 -p 3303:33060  -d mysql:latest
```
If the port is in use, change it on the command and the `src/constants/db.constants.ts` file.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
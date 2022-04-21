## Description

Fome-zero back end API project - **Ioasys BACK-END 2022**

[Nest](https://github.com/nestjs/nest) framework TypeScript.

## Installation

### Setup env variables
```bash
DB_HOST                  => HOST DATA BASE                (REQUIRED) EX: ec2-1-111-11-111.compute-1.amazonaws.com 
DB_PORT                  => HOST DATA BASE PORT           (REQUIRED) EX: 5432
DB_USERNAME              => DATA BASE USERNAME            (REQUIRED) EX: postgres 
DB_PASSWORD              => DATA BASE PASSWORD            (REQUIRED) EX: root
DB_DATABASE_NAME         => DATA BASE NAME                (REQUIRED) EX: fome-zero 

DB_HOST_LOCAL             => LOCAL HOST DATA BASE                (REQUIRED) EX: 127.0.0.1  
DB_PORT_LOCAL             => LOCAL HOST DATA BASE PORT           (REQUIRED) EX: 5432
DB_USERNAME_LOCAL         => LOCAL DATA BASE USERNAME            (REQUIRED) EX: postgres 
DB_PASSWORD_LOCAL         => LOCAL DATA BASE PASSWORD            (REQUIRED) EX: root
DB_DATABASE_NAME_LOCAL    => LOCAL DATA BASE NAME                (REQUIRED) EX: fome-zero 

PORT                      => API PORT                      (REQUIRED) EX: 3000 

CRYPTO_KEY                => CRYPTOGRAPHY KEY              (REQUIRED) EX: hISH0ds8adsdh8ud
IV_HEX_KEY                => CRYPTOGRAPHY IV KEY           (REQUIRED) EX: 9Fu890dsy83d3

JWT_SECRET                => JWT TOKEN SECRET              (REQUIRED) EX: 9gS%A$5f$F$EWF4 
EXPIRES_IN=               => JWT TOKEN EXPIRATION TIME     (REQUIRED) EX: 60s
REFRESH_JWT_SECRET        => REFRESH TOKEN SECRET          (REQUIRED) EX: Sd9SDWE%d5w43
REFRESH_EXPIRES_IN        => REFRESH TOKEN EXPIRATION TIME (REQUIRED) EX: 24H

FILE_BASE_KEY             => FILE BASE BUCKET KEY          (REQUIRED) EX: 4B5D08729ED46678768E
FILE_BASE_SECRET          => FILE BASE BUCKET SECRET       (REQUIRED) EX: vA3iqgI7yCgNQfx6NUsayUmKaLw1CIe9eFYnLwGw

```

### Install dependences
```bash
$ npm install
```

### Transpile TS to JS

```bash
$ npm run build
```

### Run migrations
```bash
$ npm run typeorm migration:run
```

### Run seeds
```bash
$ npm run seed:run
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run build
$ npm run start
```

## API Consideration

### API SWAGGER

API documentation can be accessed through SWAGGER at: "/api/docs/"

### Database

![database diagram](https://github.com/iOasys-G5-Fome-Zero/backend/blob/develop/db-diagram.JPG?raw=true "Database Diagram")

## Revert Seeds and Migrations

In order to revert seeds and migrations, you MUST execute SEED revert before MIGRATION revert (even if you want to revert MIGRATIONS only, once SEED is a type of MIGRATION).

### Reverting seeds

```bash
$ npm run seed:revert
```

### Reverting migrations

Execute the next command the number of migration tables you have (8x):
```bash
$ npm run typeorm migration:revert
```

## Editing

The code can be auto-formated:

```bash
$ npm run format
```

and ES Lint erros can be found:

```bash
$ npm run lint
```

## Data Base Encryption Structure

This project has a structure for future database encryption.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

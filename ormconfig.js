require('dotenv/config');

module.exports = [
  {
    type: 'postgres',
    host: process.env.DEV_MODE ? process.env.DB_HOST_DEV : process.env.DB_HOST,
    port: process.env.DEV_MODE ? process.env.DB_PORT_DEV : process.env.DB_PORT,
    username: process.env.DEV_MODE
      ? process.env.DB_USERNAME_DEV
      : process.env.DB_USERNAME,
    password: process.env.DEV_MODE
      ? process.env.DB_PASSWORD_DEV
      : process.env.DB_PASSWORD,
    database: process.env.DEV_MODE
      ? process.env.DB_DATABASE_NAME_DEV
      : process.env.DB_DATABASE_NAME,
    synchronize: false,
    logging: false,
    migrations: ['dist/infra/typeorm/migrations/*.js'],
    entities: ['dist/src/shared/entities/**/*.entity.js'],
    cli: {
      entitiesDir: 'src/shared/entities/',
      migrationsDir: 'infra/typeorm/migrations',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    synchronize: false,
    logging: false,
    migrations: ['dist/infra/typeorm/seeds/*.js'],
    cli: {
      migrationsDir: 'infra/typeorm/seeds',
    },
  },
];

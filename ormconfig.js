require('dotenv/config');

const getDbData = (variable) => {
  const local = process.env.LOCAL_MODE ? '_LOCAL' : '';
  return process.env[variable + local];
};

module.exports = [
  {
    type: 'postgres',
    port: getDbData('DB_PORT'),
    host: getDbData('DB_HOST'),
    username: getDbData('DB_USERNAME'),
    password: getDbData('DB_PASSWORD'),
    database: getDbData('DB_DATABASE_NAME'),
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
    port: getDbData('DB_PORT'),
    host: getDbData('DB_HOST'),
    username: getDbData('DB_USERNAME'),
    password: getDbData('DB_PASSWORD'),
    database: getDbData('DB_DATABASE_NAME'),
    synchronize: false,
    logging: false,
    migrations: ['dist/infra/typeorm/seeds/*.js'],
    cli: {
      migrationsDir: 'infra/typeorm/seeds',
    },
  },
];

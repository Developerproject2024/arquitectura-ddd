import settings from '../settings';

export default () => {
  const config = settings();
  const env = process.env.NODE_ENV || 'dev';
  const dbConfigByEnv = {
    dev: {
      dialect: 'postgres',
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      name: config.db.name,
    },
    qa: {
      dialect: 'postgres',
      host: process.env.QA_DB_HOST || config.db.host,
      port: parseInt(process.env.QA_DB_PORT || String(config.db.port), 10),
      username: process.env.QA_DB_USERNAME || config.db.username,
      password: process.env.QA_DB_PASSWORD || config.db.password,
      name: process.env.QA_DB_NAME || config.db.name,
    },
    prod: {
      dialect: 'postgres',
      host: process.env.PROD_DB_HOST || config.db.host,
      port: parseInt(process.env.PROD_DB_PORT || String(config.db.port), 10),
      username: process.env.PROD_DB_USERNAME || config.db.username,
      password: process.env.PROD_DB_PASSWORD || config.db.password,
      name: process.env.PROD_DB_NAME || config.db.name,
    },
  };

  return {
    database: dbConfigByEnv[env] ?? dbConfigByEnv.dev,
  };
};
import settings from '../settings';

export default () => {
  const config = settings();
  return {
    database: {
      dialect: 'postgres',
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      name: config.db.name,
    },
  };
};
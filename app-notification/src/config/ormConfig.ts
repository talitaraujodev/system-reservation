import { DataSource } from 'typeorm';
import envConfig from './envConfig';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: envConfig.dbHost,
  port: envConfig.dbPort,
  username: envConfig.dbUser,
  password: envConfig.dbPassword,
  database: envConfig.dbName,
  synchronize: false,
  logging: true,
  entities: [],
  migrations: [],
});

void appDataSource.initialize();

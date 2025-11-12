import { DataSource } from 'typeorm';
import envConfig from './envConfig';
import { BookingEntity } from 'src/adapter/output/persistense/entities/BookingEntity';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: envConfig.dbHost,
  port: envConfig.dbPort,
  username: envConfig.dbUser,
  password: envConfig.dbPassword,
  database: envConfig.dbName,
  synchronize: false,
  logging: true,
  entities: [BookingEntity],
  migrations: [],
});

void appDataSource.initialize();

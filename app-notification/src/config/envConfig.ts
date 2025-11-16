export default {
  dbName: process.env.PG_DATABASE || 'hotel_booking',
  dbHost: process.env.PG_HOST || 'localhost',
  dbPort: Number(process.env.PG_PORT) || 5432,
  dbUser: process.env.PG_USER || 'postgres',
  dbPassword: process.env.PG_PASSWORD || '123456',
  serverPort: Number(process.env.SERVER_PORT) || 8004,
};

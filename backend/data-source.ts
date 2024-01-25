import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user-name',
  password: 'strong-password',
  database: 'user-name',
  migrations: ['dist/migrations/*.js'],
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

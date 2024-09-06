import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config();

export const dataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ["src/**/*.entity.js"],
  migrations: ["src/migrations/*.js", "src/seeds/*.js"],
  migrationsRun: true,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

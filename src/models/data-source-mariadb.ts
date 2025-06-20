import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

const baseDir = `${path.resolve()}/src/models/`;

export const MariaDBAppDataSource = new DataSource({
  type: "mariadb",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [baseDir + "**/entities/*.{ts,js}"],
  migrations: [baseDir + "**/migrations/mariadb/*.{ts,js}"],
  subscribers: [],
});
import "dotenv/config";
import "reflect-metadata";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from "typeorm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const SQLiteAppDataSource = new DataSource({
    type: "sqlite",
    database: `${__dirname}/db.sqlite`,
    synchronize: false,
    logging: true,
    entities: [__dirname + "**/entities/*.{ts,js}"],
    migrations: [__dirname + "**/migrations/sqlite/*.{ts,js}"],
    subscribers: [],
});

export const MariaDBAppDataSource = new DataSource({
  type: "mariadb",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [__dirname + "**/entities/*.{ts,js}"],
  migrations: [__dirname + "**/migrations/mariadb/*.{ts,js}"],
  subscribers: [],
});
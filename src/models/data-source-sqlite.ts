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


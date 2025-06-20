import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";

const baseDir = `${path.resolve()}/src/models/`;

export const SQLiteAppDataSource = new DataSource({
    type: "sqlite",
    database: `${baseDir}/db.sqlite`,
    synchronize: false,
    logging: true,
    entities: [baseDir + "**/entities/*.{ts,js}"],
    migrations: [baseDir + "**/migrations/sqlite/*.{ts,js}"],
    subscribers: [],
});


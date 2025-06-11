import { DataSource } from "typeorm";
import { MariaDBAppDataSource } from "./data-source-mariadb";
import { SQLiteAppDataSource } from "./data-source-sqlite";

export async function initializeDB(db: string) {
    const dataSource: Record<string, DataSource> = {"sqlite": SQLiteAppDataSource, "mariadb": MariaDBAppDataSource};
    
    const selectedDataSource = dataSource[db];

    if (!selectedDataSource) {
        console.error(`Database "${db}" unsupported.`);
        return;
    }

    await selectedDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
};
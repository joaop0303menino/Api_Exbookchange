import { initializeDB } from "./models/connection-db";
import ServerApp from "./server/ServerApp";

await initializeDB("sqlite");

const app = new ServerApp();

app.listen();
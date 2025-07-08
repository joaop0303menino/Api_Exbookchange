import { InternalServerError } from "./helpers/APIErrors";
import { ConnectionCacheRedis } from "./models/connection-cache-redis";
import { initializeDB } from "./models/connection-db";
import ServerApp from "./server/ServerApp";

async function main() {
    try {
        await initializeDB("sqlite");
        
        await ConnectionCacheRedis.getInstance().connect();
        
        const app = new ServerApp();
        
        app.listen();

        process.on("SIGINT", async () => {
            console.log("Server closed");
            await ConnectionCacheRedis.getInstance().disconnect();
            process.exit(0);
        });
        
        process.on("SIGTERM", async () => {
            console.log("Server closed");
            await ConnectionCacheRedis.getInstance().disconnect();
            process.exit(0);
        });
    } catch (error) {
        console.error({status: "error", message: "Error initializing server", details: error});
        process.exit(1);
    };
};

main();
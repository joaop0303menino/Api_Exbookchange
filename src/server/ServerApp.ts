import express, { Application } from "express";
import cors from "cors";
import { errorMiddlewares } from "../middlewares/errorMiddleware";

export default class ServerApp {
    private readonly app: Application;
    private readonly port: number;
    
    constructor() {
        this.app = express();
        this.port = parseInt(process.env.SERVER_PORT!);
        this.init();
    };

    private init() {
        this.initMiddlewares();
        this.initRoutes();
        this.initMiddlewareErrors();
    };

    private initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    };

    private initMiddlewareErrors() {
        this.app.use(errorMiddlewares);
    };

    private initRoutes() {
        this.app.get("/", (req, res) => {res.status(200).json({status: "sucess", mensage: "Server initialized with sucess", details: undefined})});
    };

    public listen() {
        this.app.listen(this.port, (error) => {
            if (error) {
                return console.error({status: "error", mensage: "Error by initializing server", details: error});
            };
            return console.log({status: "sucess", mensage: "Server initialized with sucess", details: error});
        });
    };
};
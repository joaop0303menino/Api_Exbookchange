import { Request, Response, Router } from "express";
import { AuthController } from "../../controllers/AuthController";

class AuthRoutes {
    private readonly authController: AuthController;
    public readonly router: Router;

    constructor() {
        this.authController = new AuthController();
        this.router = Router();

        this.initRoutes();
    };

    async initRoutes() {
        this.router.post("/sign-up", async (req: Request, res: Response) => {await this.authController.signUp(req, res)});
        this.router.post("/sign-in", async (req: Request, res: Response) => {await this.authController.signIn(req, res)});
        this.router.post("/sign-out", async (req: Request, res: Response) => {await this.authController.signOut(req, res)});
        this.router.post("/refresh-token", async (req: Request, res: Response) => {await this.authController.refreshToken(req, res)});
    };
};

export default new AuthRoutes().router
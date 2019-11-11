import express from 'express';
import StaticRouter from './static';
import AuthRouter from './auth';

class CommonRouter {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.use(`/`, StaticRouter);
        this.router.use(`/auth`, AuthRouter);
    }

    getInstance() {
        return this.router;
    }
}

const commonRouter = new CommonRouter();
export default commonRouter.getInstance();
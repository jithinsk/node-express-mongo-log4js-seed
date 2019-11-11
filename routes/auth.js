import express from 'express';
import AuthController from './../controllers/authController'
import ValidationMiddleWare from './../middlewares/validator';
import LoginValidator from './../validators/login';

class AuthRouter {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    registerRoutes() {
        /* Login user */
        this.router.post('/signin', ValidationMiddleWare(LoginValidator), AuthController.loginUser);
    }

    getInstance() {
        return this.router;
    }
}

const authRouter = new AuthRouter();
export default authRouter.getInstance();
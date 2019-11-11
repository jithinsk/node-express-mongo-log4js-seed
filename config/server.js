import express from "express";
import path from 'path';
import initRoutes from "../routes/index";
import NotFoundError from './../errors/notFoundError';
import Utils from './../utils/utils';
import {
    setupLogging
} from './../utils/logger';

class App {
    constructor() {
        this.app = express();
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(setupLogging());
        this.app.use(initRoutes);
        this.app.use(this.invalidURLHandler);
        this.app.use(this.errorHandler);
    }

    invalidURLHandler(req, res, next) {
        return next(new NotFoundError());
    }

    errorHandler(error, req, res, next) {
        let { statusCode, message } = Utils.identifyAndLogError(req.url, error);
        return res.status(statusCode).send(message);
    }

    getInstance() {
        return this.app;
    }
}

const app = new App();
export default app.getInstance();


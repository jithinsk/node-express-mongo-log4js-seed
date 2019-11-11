import express from 'express';
const router = express.Router();

class HomeRouter {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    registerRoutes() {
        /* GET home page. */
        this.router.get('/', (req, res, next) => res.sendFile('index.html', { root: `${__dirname}./../public` }));
      }

    getInstance() {
        return this.router;
    }
}

const homeRouter = new HomeRouter();
export default homeRouter.getInstance();
import { configure, getLogger, connectLogger } from 'log4js';
import {
    LOGCONFIG
} from '../config/config';

class Logger {
    constructor() {
        configure(LOGCONFIG);
        this.logger = getLogger();
    }

    getInstance() {
        return this.logger;
    }

    setupLogging() {
        return connectLogger(getLogger("http"), { level: 'auto' });
    }
}

const logger = new Logger();
exports.getInstance = logger.getInstance();
exports.setupLogging = logger.setupLogging;
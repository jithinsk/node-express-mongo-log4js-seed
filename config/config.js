"use strict";

module.exports = {
    LOGCONFIG: {
        "appenders": {
            "access": {
                "type": "file",
                "filename": "./dist/logs/access.log",
                "maxLogSize": 10485760,
                "backups": 3,
                "category": "http"
            },
            "app": {
                "type": "file",
                "filename": "./dist/logs/app.log",
                "maxLogSize": 10485760,
                "backups": 3
            },
            "errors": {
                "type": "file",
                "filename": "./dist/logs/error.log",
                "maxLogSize": 10485760,
                "backups": 3
            },
            "errorFileFilter": {
                "type": "logLevelFilter",
                "appender": "errors",
                "level": "WARN"
            },
            "appFileFilter": {
                "type": "logLevelFilter",
                "appender": "app",
                "level": "INFO",
                "maxLevel": "INFO"
            }
        },
        "categories": {
            "default": {
                "appenders": ["appFileFilter", "errorFileFilter"],
                "level": "ALL"
            },
            "http": {
                "appenders": ["access"],
                "level": "DEBUG"
            }
        }
    },
    PORT: '3030',
    MONGODB_URI: 'mongodb://localhost:27017/seed',
    JSON_WEB_TOKEN_KEY: 'dYIA83jdDA72ndy39dd89sKKMD83hhs3',
    JSON_WEB_TOKEN_ALGORITHM: 'HS512',
    JSON_WEB_TOKEN_EXPIRY_TIME: 86400,
    REMOVABLE_ATTRIBUTES: ['password', 'salt', 'tokens', '_id', '__v'],
    HASHING_ITERATIONS: 1000,
    HASHING_KEY_LENGTH: 64,
    HASHING_DIGEST: 'sha512',
    HASHING_ENCODING: 'hex'
};
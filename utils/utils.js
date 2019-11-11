import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {
    JSON_WEB_TOKEN_KEY,
    JSON_WEB_TOKEN_EXPIRY_TIME,
    JSON_WEB_TOKEN_ALGORITHM,
    HASHING_ITERATIONS,
    HASHING_KEY_LENGTH,
    HASHING_DIGEST,
    HASHING_ENCODING,
} from './../config/config';
import {
    REMOVABLE_ATTRIBUTES
} from './../config/config';
import ValidationError from './../errors/validationError';
import NotFoundError from './../errors/notFoundError';
import InternalError from './../errors/internalError';
import TokenVerificationError from './../errors/tokenVerificationError';
import PasswordMissMatchError from './../errors/passwordMismatchError';
import {
    getInstance as Logger
} from './logger';
  
class Utils {
    constructor() {
        this.identifyAndLogError = this.identifyAndLogError.bind(this);
        this.generatePasswordHash = this.generatePasswordHash.bind(this);
        this.signToken = this.signToken.bind(this);
        this.verifyToken = this.verifyToken.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
    }

    identifyAndLogError(reqUrl, error) {
        Logger.log('error', `Error occurred while accesssing API Endpoint: ${reqUrl}
            StatusCode: ${error.httpErrorCode ? error.httpErrorCode : 500}
            message: ${error.message}`);
        switch (true) {
            case error instanceof PasswordMissMatchError:
            case error instanceof TokenVerificationError:
            case error instanceof InternalError:
            case error instanceof NotFoundError:
            case error instanceof ValidationError:
                return {
                    statusCode: error.httpErrorCode,
                    message: error.data
                }
            default:
                return {
                    statusCode: 500,
                    message: {
                        message: `An unexpected error occurred`,
                        code: 500
                    }
                }
        }
    }

    async generatePasswordHash(password, salt) {
        try {
            salt = salt ? salt : crypto.randomBytes(16).toString(HASHING_ENCODING);
            let hash = crypto.pbkdf2Sync(password, salt, HASHING_ITERATIONS, HASHING_KEY_LENGTH, HASHING_DIGEST).toString(HASHING_ENCODING);
            return { salt, hash };
        } catch (error) {
            return Promise.reject(new InternalError(`Error occurred while generating password hash, error: ${error.message}`));
        }
    }

    async signToken(id) {
        try {
            let data = jwt.sign({ _id: id }, JSON_WEB_TOKEN_KEY, {
                expiresIn: JSON_WEB_TOKEN_EXPIRY_TIME,
                algorithm: JSON_WEB_TOKEN_ALGORITHM
            });
            return data;
        } catch (error) {
            return Promise.reject(new InternalError(`Error occurred while signing token, error: ${error.message}`));
        }
    }

    async verifyToken(token) {
        try {
            let data = jwt.verify(token, JSON_WEB_TOKEN_KEY);
            return data;
        } catch (error) {
            return Promise.reject(new InternalError(`Error occurred while verifying token, error: ${error.message}`));
        }
    }

    validateResponse(dataAttributeValue) {
        if (typeof dataAttributeValue !== 'object') return {
            message: dataAttributeValue
        }
        for (const attribute in dataAttributeValue) if (dataAttributeValue.hasOwnProperty(attribute) && REMOVABLE_ATTRIBUTES.indexOf(attribute) !== -1) delete dataAttributeValue[attribute];
        return dataAttributeValue;
    }

}

const utils = new Utils();
export default utils;
import Controller from './controller';
import User from "./../models/user";
import AuthService from "./../services/authService";
import PasswordMissMatchError from './../errors/passwordMismatchError';
import Utils from './../utils/utils';

class AuthController extends Controller {

    constructor(service) {
        super(service);
        this.loginUser = this.loginUser.bind(this);
    }

    async loginUser(req, res, next) {
        try {
            let user = await this.service.get({ username: req.body.username });
            if (!user) throw new PasswordMissMatchError();
            let { hash } = await Utils.generatePasswordHash(req.body.password, user.salt);
            if (hash !== user.password) throw new PasswordMissMatchError();
            const token = await Utils.signToken(user._id);
            let updatedData = await this.service.update(user._id, { tokens: user.tokens.concat({ token }) });
            return res.status(200).send(Utils.validateResponse(Object.assign({}, updatedData, { token })));
        } catch (error) {
            next(error);
        }
    }
}

const authService = new AuthService(new User().getInstance());
export default new AuthController(authService);

import Controller from './controller';
import User from "./../models/user";
import UserService from "./../services/userService";
import Utils from './../utils/utils';
  
class UserController extends Controller {

    constructor(service) {
        super(service);
    }

    async authorizeUser(req, res, next) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = await Utils.verifyToken(token);
            let user = await this.service.get({ _id: data._id });
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }

}

const userService = new UserService(new User().getInstance());
export default new UserController(userService);

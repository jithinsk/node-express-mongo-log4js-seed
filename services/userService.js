import DatabaseService from './databaseService';

class UserService extends DatabaseService {
    constructor(model) {
        super(model);
    }
};

export default UserService;
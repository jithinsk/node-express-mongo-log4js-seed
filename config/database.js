import mongoose from "mongoose";
import {
    MONGODB_URI
} from './config';

class Connection {
  constructor() {
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(MONGODB_URI);
  }
}

export default new Connection();
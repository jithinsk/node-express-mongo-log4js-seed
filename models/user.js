import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import TokenSchema from './token';

class User {

    initSchema() {
        this.schema = new Schema({
            username: {
                type: String,
                unique: true,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            salt: {
                type: String,
                required: true
            },
            firstname: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            },
            tokens: [new TokenSchema().getInstance()]
        }, { timestamps: true });

        this.schema.plugin(uniqueValidator);
        mongoose.model("users", this.schema);
    }

    getInstance() {
        if (mongoose.modelNames().indexOf("users") === -1) this.initSchema();
        return mongoose.model("users");
    }
}

export default User;

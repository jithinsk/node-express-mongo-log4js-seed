import { Schema } from "mongoose";

class Token {
    initSchema() {
        this.schema = new Schema({
            token: {
                type: String,
                required: true
            }
        },{ _id : false });
    }

    getInstance() {
        if (!this.schema) this.initSchema();
        return this.schema;
    }
}

export default Token;

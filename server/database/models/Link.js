const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkScheme = new Schema({
    target: { type: String, required: true, index: true },
    link: { type: String, index: true,  unique: true, required: true, dropDups: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', default: null }
});

LinkScheme.methods.isPrivate = function() {
    return !!this.owner;
};

export default () => mongoose.model("Link", LinkScheme);
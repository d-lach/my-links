const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkScheme = new Schema({
    target: { type: String, required: true, index: true },
    link: {type: String, index: true,  unique: true, required: true, dropDups: true }
});

export default () => mongoose.model("Link", LinkScheme);
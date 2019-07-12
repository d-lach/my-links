const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkScheme = new Schema({
    target: { type: String, required: true },
    links: {type: [String], index: true, required: true }
});

export default mongoose.model("Link", LinkScheme);
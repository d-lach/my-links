import LinkModel from '../database/models/Link';
const hashids = new (require('hashids'))();

export default {
    getAll(page = 1) {
        return LinkModel.find();
    },

    removeAll() {
        return LinkModel.deleteMany({});
    },

    add(linkData) {
        return this._wrapLinkData(linkData).save();
    },

    addMany(linksData) {
        return LinkModel.insertMany(linksData.map(this._wrapLinkData))
    },

    findTarget(link) {
        return LinkModel.findOne({ link }).select({target: 1, _id: 0});
    },

    _wrapLinkData(linkData) {
        if (!linkData.link)
            linkData.link = this._generateRandomUniqueId();

        return new LinkModel(linkData);
    },

    _generateRandomUniqueId() {
        return hashids.encode(Date.now());
    },
}
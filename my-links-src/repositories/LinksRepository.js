import LinkModel from '../database/models/Link';

export default {
    removeAll() {
        return LinkModel.deleteMany({});
    },

    add(linkData) {
        return this._wrapLinkData(linkData).save();
    },

    addMany(linksData) {
        return LinkModel.insertMany(linksData.map(this._wrapLinkData))
    },

    _wrapLinkData(linkData) {
        if (!linkData.links)
            linkData.links = [];

        if (linkData.link)
            linkData.links.push(linkData.link);

        return new LinkModel(linkData);
    },

    findTarget(link) {
        return LinkModel.findOne({ links: link }).select({target: 1, _id: 0});
    }
}
import boundMethod from 'autobind-decorator';

export default class LinksRepository {

    constructor({linkModel, idGenerator}) {
        this.links = linkModel;
        this.generateId = idGenerator;
    }

    getAll(page = 1) {
        return this.links.find();
    }

    removeAll() {
        return this.links.deleteMany({});
    }

    add(linkData) {
        return this._wrapLinkData(linkData).save();
    }

    addMany(linksData) {
        return this.links.insertMany(linksData.map(this._wrapLinkData))
    }

    get(id) {
        return this.links.findById(id);
    }

    async modify(link, newTarget) {
        link = await this.links.findOne({link});

        if (!link)
            return null;

        link.target = newTarget;
        await link.save();

        return link;
    }

    find(link) {
        return this.links.findOne({link});
    }

    findTarget(link) {
        return this.links.findOne({link}).select({target: 1, _id: 0});
    }

    remove(link) {
        return this.links.deleteOne({link})
            .then(results => {
                return results.deletedCount > 0;
            });
    }

    @boundMethod
    _wrapLinkData(linkData) {
        if (!linkData.link)
            linkData.link = this.generateId();

        return new this.links(linkData);
    }
}
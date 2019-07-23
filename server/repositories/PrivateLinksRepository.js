import Errors from "../Errors";

export default class PrivateLinksRepository {
    /**
     * @param { UsersRepository } usersRepository
     * @param { LinksRepository } linksRepository
     */
    constructor({usersRepository, linksRepository, userModel}) {
        this.usersRepository = usersRepository;
        this.links = linksRepository;
        this.users = userModel;
    }

    getAll(userOrId) {
        return this.users.findById(this._getUserId(userOrId)).populate('links').select({_id:0, links:1});
    }

    get(userOrId, link) {
        return this.users.findById(this._getUserId(userOrId))
            .populate({
                path  : 'links',
                match : { link }
            })
            .select({_id:0, links:1})
            .then(({links}) => (links.length > 0 ? links[0] : Errors.notFound.throw()));
    }

    async add(userOrId, linkData) {
        let user = await this._getUser(userOrId);
        linkData.owner = user._id;
        let newLink = await this.links.add(linkData);
        user.links.push(newLink._id);
        await user.save();

        return newLink;
    }

    async modify(userOrId, link, newTarget) {
        let user = await this._getUser(userOrId);
        link = await this.links.find(link);

        if (!link)
            Errors.notFound.throw();

        if (!link.isPrivate() || !link.owner.equals(user._id))
            Errors.unauthorized.message("It's not your link").throw();

        link.target = newTarget;
        await link.save();

        return link;
    }

    async remove(userOrId, link) {
        let user = await this._getUser(userOrId);
        link = await this.links.find(link);

        if (!link)
            Errors.notFound.throw();

        if (!link.isPrivate() || !link.owner.equals(user._id))
            Errors.unauthorized.message("It's not your link").throw();

        return this.links.remove(link.link);
    }

    _getUserId(userOrId) {
        if (typeof userOrId === 'string')
           return userOrId;
        return userOrId._id;
    }

    _getUser(userOrId) {
        if (typeof userOrId === 'string')
            return this.users.findById(userOrId);

        return Promise.resolve(userOrId);
    }
}
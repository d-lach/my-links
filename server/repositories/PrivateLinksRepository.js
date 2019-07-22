import Errors from "../Errors";

export default class PrivateLinksRepository {
    /**
     * @param { UsersRepository } usersRepository
     * @param { LinksRepository } linksRepository
     */
    constructor({usersRepository, linksRepository, userModel}) {
        this.usersRepository = usersRepository;
        this.linksRepository = linksRepository;
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

        let newLink = await this.linksRepository.add(linkData);

        user.links.push(newLink._id);
        await user.save();

        return newLink;
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
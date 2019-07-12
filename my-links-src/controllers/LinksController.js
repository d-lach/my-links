import boundClass from 'autobind-decorator';
// below import is needed only to specify constructor parameter type and thereby define the contract
import LinksRepository from '../repositories/LinksRepository';

@boundClass
class LinksController {

    /**
     * @param { LinksRepository } links
     */
    constructor(links) {
        this.links = links;
    }

    all(req, res){
        this.links.getAll()
            .then((all) => res.status(200).send(all));
    }
}

export default ({links}) => new LinksController(links);
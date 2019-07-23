import Errors from "../Errors";
import boundClass from 'autobind-decorator';
import Middleware from "../framework/Middleware";

@boundClass
class LinksResolver extends Middleware {
    constructor({linksRepository}) {
        super();
        this.links = linksRepository;
    }

    resolve(req, res, next) {
        if (!req.params.link)
            Errors.invalidRequest.message('link required').throw();

        this.links.find(req.params.link).then(foundLink => {
            if (!foundLink)
                Errors.notFound.throw();

            req.link = foundLink;
            next()
        })
            .catch(next);
    }
}

export default LinksResolver.factory;
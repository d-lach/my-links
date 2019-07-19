import Controller from "../framework/Controller";
import Errors from "../Errors";

class LinksController extends Controller {

    /**
     * @param { {linksRepository} }  links
     */
    constructor({linksRepository}) {
        super();
        this.links = linksRepository;
    }

    all(req) {
        this.links.getAll()
            .then(this.send)
            .catch(this.handleError);
    }

    show(req) {
        this.links.find(req.params.link)
            .then((link) => {
                if (!link)
                    Errors.notFound.throw();
                return link;
            })
            .then(this.send)
            .catch(this.handleError);
    }

    create(req) {
        this.links.add(req.body)
            .then(this.updated)
            .catch(this.handleError);
    }

    update(req) {
        this.links.modify(req.params.link, req.body.target)
            .then((link) => {
                if (!link)
                    Errors.notFound.throw();
                return link;
            })
            .then(this.updated)
            .catch(this.handleError);
    }

    destroy(req) {
        this.links.remove(req.params.link)
            .then((isSuccess) => {
                if (!isSuccess)
                    Errors.notFound.throw();
            })
            .then(this.deleted)
            .catch(this.handleError);
    }
}

export default LinksController.factory;
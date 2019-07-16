import Controller from "./Controller";
import {Errors} from "../services/ErrorsHandler";

class LinksController extends Controller {

    /**
     * @param { {links} }  links
     */
    constructor({links}) {
        super();
        this.links = links;
    }

    all(req) {
        this.links.getAll()
            .then(this.send);
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
            .then(this.updated);
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

    }
}

export default LinksController.factory;
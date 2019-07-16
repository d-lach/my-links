import Controller from "./Controller";

class LinksController extends Controller {

    /**
     * @param { {links} }  links
     */
    constructor({links}) {
        super();
        this.links = links;
    }

    all(req){
        this.links.getAll()
            .then(this.send);
    }

    show(req) {
        this.links.find(req.params.link)
            .then(this.send);
    }

    create(req) {
        this.links.add(req.body)
            .then(this.updated);
    }
}

export default LinksController.factory;
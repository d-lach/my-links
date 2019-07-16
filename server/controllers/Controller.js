import boundMethod from 'autobind-decorator';

export default class Controller {

    static get factory() {
        return (app) => {
            let instance = new this(app);
            let proxy = instance._setupRequestInterceptor();
            return proxy;
        }
    }

    constructor() {
        // will be set dynamically
        this.req = null;
        this.res = null;
    }

    @boundMethod
    send(payload) {
        return this.res.status(200).send(payload)
    }

    @boundMethod
    updated(payload) {
        return this.res.status(201).send(payload)
    }

    @boundMethod
    accepted() {
        return this.res.status(202).send()
    }

    @boundMethod
    deleted() {
        return this.res.status(204).send()
    }

    _setupRequestInterceptor() {
        let proxy = new Proxy(this, {
            get(instance, property) {
                return (req, res) => {
                    instance.req = req;
                    instance.res = res;
                    instance[property](req, res);
                };
            }
        });
        return proxy;
    }
}
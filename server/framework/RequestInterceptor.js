export default class RequestInterceptor {

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
        this.next = null;
    }

    _setupRequestInterceptor() {
        let proxy = new Proxy(this, {
            get(instance, property) {
                return (req, res, next) => {
                    instance.req = req;
                    instance.res = res;
                    instance.next = next;
                    instance[property](req, res, next);
                };
            }
        });
        return proxy;
    }
}
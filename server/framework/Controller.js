import boundMethod from 'autobind-decorator';
import RequestInterceptor from "./RequestInterceptor";

export default class Controller extends RequestInterceptor {

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

    @boundMethod
    handleError(error) {
        return this.next(error);
    }
}
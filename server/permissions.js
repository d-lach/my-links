import {AccessControl} from "accesscontrol";

const permissions = new AccessControl();
permissions.grant('visitor').grant('user').grant('admin');
permissions.grant('visitor')
    .createAny('link')
    .readAny('link', ['*', '!id']);

permissions.grant('user')
    .extend('visitor')
    .createOwn('link')
    .updateOwn('link', ['target'])
    .deleteOwn('link');

permissions.grant('admin')
    .extend('user')
    .updateAny('link', ['target'])
    .deleteAny('link');

permissions.lock();

export default permissions;
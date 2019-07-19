const DependencyInjector = require('awilix');

export let bootstrap = DependencyInjector.createContainer();

bootstrap.loadModules([
    ['controllers/**/*.js', DependencyInjector.Lifetime.SINGLETON],
    'middleware/**/*.js',
], {
    cwd: 'server',
    formatName: 'camelCase',
    register: DependencyInjector.asFunction,
});

bootstrap.loadModules([
    'repositories/**/*.js',
    'services/**/*.js'
], {
    cwd: 'server',
    formatName: 'camelCase',
    register: DependencyInjector.asClass,
});

bootstrap.loadModules([
    'database/models/**/*.js',
], {
    cwd: 'server',
    formatName: (modelFileName) => modelFileName.charAt(0).toLowerCase() + modelFileName.slice(1) + "Model",
    register: DependencyInjector.asFunction,
    lifetime: DependencyInjector.Lifetime.SINGLETON
});

bootstrap.register({
    passwordHasher: DependencyInjector.asValue(require('./libs/Hasher').hash),
    passwordChecker: DependencyInjector.asValue(require('./libs/Hasher').check),
    idGenerator: DependencyInjector.asValue(require('./libs/DatetimeHasher').default),
});

export default bootstrap.cradle;
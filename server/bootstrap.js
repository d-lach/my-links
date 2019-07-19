const DependencyInjector = require('awilix');

let bootstrap = DependencyInjector.createContainer();

bootstrap.loadModules([
    'controllers/**/*.js',
    'middleware/**/*.js',
], {
    cwd : 'server',
    formatName: 'camelCase',
    register: DependencyInjector.asFunction,
});

bootstrap.loadModules([
    'repositories/**/*.js',
    'services/**/*.js',
], {
    cwd : 'server',
    formatName: 'camelCase',
    register: DependencyInjector.asClass,
});

export default bootstrap.cradle;
import chai from 'chai';
import chaiHttp from 'chai-http';

// load test config
import dotenv from 'dotenv';
dotenv.config({ path: 'test/.env'});

// Configure chai
global.chai = chai;
chai.use(chaiHttp);
global.should = chai.should();
global.expect = chai.expect;

// start test server instance
global.app = require('../server/server').app;
global.bootstrap = require('../server/bootstrap').default;
before(done => app.on( "ready", done));




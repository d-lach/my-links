import chai from 'chai';
import chaiHttp from 'chai-http';

// load test config
import dotenv from 'dotenv';
dotenv.config({ path: '.test.env'});

// Configure chai
global.chai = chai;
chai.use(chaiHttp);
chai.should();

// start test server instance
global.app = require('../server').app;
before(done => app.on( "ready", done));




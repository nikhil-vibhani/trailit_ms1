const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

module.exports = function () {
    let server;

    beforeEach(() => {
        server = 'http://localhost:3008';
    });

    // Create new trailit
    describe('/POST createTrailit', () => {
        it ('should create new trailit', (done) => {
            chai.request(server)
                .post('/trailit/api/v1/trailitTour/createTrailit')
                .end((err, res) => {
                    
                    done();
                });
        });
    });
};
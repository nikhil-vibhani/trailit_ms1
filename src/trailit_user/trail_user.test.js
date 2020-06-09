const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

module.exports = function () {
    let server, user_id = '5ec7a0d39238c4115d7145c4';

    // console.log(`======================== TOOLTIP trail data tests ========================`);

    beforeEach(() => {
        server = 'http://localhost:3008';

        userData = {
            user_id,
            trail_name: 'tesing trail api functionality'
        };
    });

    // Test on create trail_id in user_tour table api
    describe('/POST createTrail_trail_user_tour', () => {
        
        // Create tooltip trail
        it ('should create trail_id into user_tour table', (done) => {
            chai.request(server)
                .post('/trailit/api/v1/trailitUser/createTrail_trail_user_tour')
                .send(userData)
                .end((err, res) => {    
                    expect(res.body.response).to.be.an('array');
                    expect(res.body.response[0]).to.have.property('trail_id');
                    expect(res.body.response[0].trail_name).to.equal('tesing trail api functionality');
                    done();
                });
        })
    });
};
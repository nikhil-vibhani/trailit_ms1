const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

module.exports = function () {
    let server, trailitDetailData, trail_detail_id, trailDetailUpdateData;

    // console.log(`======================== Trailit Detail tests ========================`);

    beforeEach(() => {
        server = 'http://localhost:3008';

        trailitDetailData = {
            trail_id: '6',
            title: '6th trailit detail',
            description: '6th trailit detail from test',
            web_url: 'www.wdcs.com',
            element_content: 'This is the 6th trailit detail added from test',
            created: new Date().getTime()
        };

        trail_detail_id = trail_detail_id ? trail_detail_id : '7';

        trailDetailUpdateData = {
            trail_detail_id: trail_detail_id ? trail_detail_id : '7',
            updateValue: {
                title: '7th trailit detail',
                description: '6th trailit detail updated to 7th from test'
            },
            updated: new Date().getTime()
        }
    });

    // Test on create Trailit Detail api
    describe('/POST createTrailit_detail_tour', () => {
        
        // Create trailit detail
        it ('should create new trailit detail', (done) => {

            // trailitDetailData = {
            //     title: '6th trailit detail',
            //     description: '6th trailit detail from test',
            //     web_url: 'www.wdcs.com',
            //     element_content: 'This is the 6th trailit detail added from test',
            //     created: new Date().getTime()
            // };

            chai.request(server)
                .post('/trailit/api/v1/userTourDetail/createTrailit_detail_tour')
                .send(trailitDetailData)
                .end((err, res) => {
    
                    // console.log('line: 44', res.body);
                    trail_detail_id = res.body.response.result.trail_detail_id;
                    // expect(res.body.error.errors.message).to.equal('Trail id cannot be empty');
                    expect(res.body.response.statusCode).to.equal('201');
                    expect(res.body.response.result).to.have.property('trail_detail_id');
                    done();
                });
        })
    });

    // Test on get all trailit detail api
    describe('/GET readTrailits_detail_tour', () => {
        
        // Read all trailit detail
        it ('should get all trailit detail in array', (done) => {

            chai.request(server)
                .get('/trailit/api/v1/userTourDetail/readTrailits_detail_tour')
                .end((err, res) => {

                    // console.log('line: 62', res.body);
                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result).to.be.an('array');
                    done();
                });                
        });
    });

    // Test on get single trailit detail api
    describe('/GET readTrailit_detail_tour/:trail_detail_id', () => {

        // Read single trailit detail
        it ('should get single trailit detail by id', (done) => {

            chai.request(server)
                .get('/trailit/api/v1/userTourDetail/readTrailit_detail_tour/' + trail_detail_id)
                .end((err, res) => {
                    
                    // console.log('line: 79', res.body);
                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result).to.be.an('object');
                    expect(res.body.response.result).to.have.property('trail_id');
                    done();
                });
        });
    });

    // Test on update trailit detail api
    describe('/PUT updateTrailit_detail_tour/:trail_detail_id', () => {

        // Update trailit detail
        it ('should update trailit detail by id', (done) => {

            chai.request(server)
                .put('/trailit/api/v1/userTourDetail/updateTrailit_detail_tour/' + trail_detail_id)
                .send(trailDetailUpdateData)
                .end((err, res) => {

                    // console.log('line: 98', res.body);
                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result.title).to.equal(trailDetailUpdateData.updateValue.title);
                    expect(res.body.response.result.description).to.equal(trailDetailUpdateData.updateValue.description);
                    done();
                });
        });
    });

    // Test on delete trailit detail api
    describe('/DELETE deleteTrailit_detail_tour/:trail_detail_id', () => {

        // Delete trailit detail
        it ('should delete trailiit detail by id', (done) => {

            chai.request(server)
                .delete('/trailit/api/v1/userTourDetail/deleteTrailit_detail_tour/' + trail_detail_id)
                .end((err, res) => {

                    // console.log('line: 116', res.body);
                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result.message).to.equal('Trail detail deleted!');
                    expect(res.body.response.result.count).to.equal(1);
                    done();
                });
        });
    });
};
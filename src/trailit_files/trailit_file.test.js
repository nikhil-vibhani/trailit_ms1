const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

module.exports = function () {
    let server, trailtFileData, trail_file_id, trailitFileUpdateData;

    // console.log('======================== Trailit File tests ========================');

    beforeEach(() => {        
        server = 'http://localhost:3008';
        
        trailtFileData = {
            trail_id: '10',
            title: '10th trailit file',
            description: 'My 10th trailit file',
            web_url: 'www.codezeros.com',
            element_content: 'This is the 10th trail file created by trailit extension',
            file_type: 'audio',
            created: new Date().getTime()
        };
        
        trail_file_id = trail_file_id ? trail_file_id : '6';
        
        trailitFileUpdateData = {
            trail_file_id: trail_file_id ? trail_file_id : '6',
            updateValue: {
                web_url: 'www.google.com',
                file_type: 'video'
            },
            updated: new Date().getTime()
        };
    });

    // Test on create trailit file api
    describe('/POST createTrailit_file_tour', () => {

        // Create trailit file
        it ('should create new trailit file', (done) => {
           
            chai.request(server)
                .post('/trailit/api/v1/userTourFileDetail/createTrailit_file_tour')
                .send(trailtFileData)
                .end((err, res) => {

                    trail_file_id = res.body.response.result.trail_file_id;
                    expect(res.body.response.statusCode).to.equal('201');
                    expect(res.body.response.result).to.have.property('trail_file_id');
                    done();
                });
        });
    });

    // Test on get all trailit files api
    describe('/GET readTrailit_files_tour', () => {

        // Read all trailit files
        it ('should get all trailit files in array', (done) => {

            chai.request(server)
                .get('/trailit/api/v1/userTourFileDetail/readTrailit_files_tour')
                .end((err, res) => {

                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result).to.be.an('array');
                    done();
                });
        });
    });

    // Test on get single trailit file api
    describe('/GET readTrailit_file_tour/:trail_file_id', () => {

        // Read trailit file by id(trail_file_id)
        it ('should get trailit file by id', (done) => {

            chai.request(server)
                .get('/trailit/api/v1/userTourFileDetail/readTrailit_file_tour/' + trail_file_id)
                .end((err, res) => {
                    
                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result).to.be.an('object');
                    expect(res.body.response.result).to.have.property('file_type');
                    expect(res.body.response.result).to.not.have.property('trail_detail_id');
                    done();
                });
        });
    });

    // Test on update trailit file api
    describe('/PUT updateTrailit_file_tour/:trail_file_id', () => {

        // Update trailit file by id(trail_file_id)
        it ('should update trailit file by id', (done) => {
            
            chai.request(server)
                .put('/trailit/api/v1/userTourFileDetail/updateTrailit_file_tour/' + trail_file_id)
                .send(trailitFileUpdateData)
                .end((err, res) => {

                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result.file_type).to.equal(trailitFileUpdateData.updateValue.file_type);
                    expect(res.body.response.result.web_url).to.equal(trailitFileUpdateData.updateValue.web_url);
                    done();
                });
        });
    });

    // Test on delete trailit file api
    describe('/DELETE deleteTrailit_file_tour/:trail_file_id', () => {

        // Delete trailit file by id(trail_file_id)
        it ('should delelte trailit file by id', (done) => {
            chai.request(server)
                .delete('/trailit/api/v1/userTourFileDetail/deleteTrailit_file_tour/' + trail_file_id)
                .end((err, res) => {

                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result.message).to.equal('Trail file deleted!');
                    expect(res.body.response.result.count).to.equal(1);
                    done();
                });
        });
    });
};
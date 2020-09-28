const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

module.exports = function () {
    
    let server, trailitdata, trail_data_id, trailDataUpdate, user_id = '5ec7a0d39238c4115d7145c4';
    // console.log(`======================== TOOLTIP trail data tests ========================`);
    
    beforeEach(() => {
        server = 'http://localhost:3008';

        trailitdata = [{
            user_id: '5ec7a0d39238c4115d7145c4',
            trail_id: '11',
            title: 'testing tooltip trail data',
            description: '',
            type: 'tooltip',
            mediaType: 'audio',
            web_url: 'https://trailit-files.s3.jp-tok.cloud-object-storage.appdomain.cloud/1590987434018_file_example_MP3_1MG.mp3',
            url: 'https://www.reddit.com/r/gifs/comments/gu8inv/la_cop_car_rams_protester_on_live_tv_chopper/',
            path: [{dasdfsf: 'adsfasklfaslf'}, {kasjfl: 'asdfsadfas'}, {slkdfajlsdf: 'asdfsfsaf'}],
            selector: 'html>.trail_body>div>._1VP69d9lk-Wk9zokOaylL>.hciOr5UGrnYrZxB11tX9s>.SubredditVars-r-gifs>._1nxEQl5D2Bx2jxDILRHemb...>._1npCwF50X2J7Wt82SZi6J0._3OGqXkiUb_0ZMlksb26boO>.u35lf2ynn4jHsVUwPmNU.Dx3UxiK86VcfkFQVHNXNi._3KaECfUAGLfWQPO5eNjMNl>.uI_hDmU5GSiudtABRz_37.>._1oQyIsiPHYt6nx7VOmd1sz._2rszc84L136gWQrkwH6IaM..Post.t3_gu8inv.>div>._3spkFGVnKMHZ83pDAhW3Mx._2b68Lt6xHaLir5082LDDA9>a>.media-element.tErWI93xEKrI2OkozPs7Junique_target',
            uniqueTarget: 'a > .media-element',
            class: 'media-element tErWI93xEKrI2OkozPs7J trail_web_user trail_tour_tooltip',
            created: new Date().getTime(),
            trailIndex: 1,
            flag: ''
        }];

        trail_data_id = trail_data_id ? trail_data_id : '7';

        trailDataUpdate = {
            trail_data_id: trail_data_id ? trail_data_id : '7',
            updateValue: {
                title: '7th trailit detail',
                description: '6th trailit detail updated to 7th from test'
            },
            updated: new Date().getTime()
        }
    });
    
    // Test on create Trailit data api
    describe('/POST createTrailit_trail_data_tour', () => {
        
        // Create tooltip trail
        it ('should create new tooltip trail', (done) => {
            chai.request(server)
                .post('/trailit/api/v1/userTourDataDetail/createTrailit_trail_data_tour')
                .send(trailitdata)
                .end((err, res) => {    
                    trail_data_id = res.body.response.result[0].trail_data_id;
                    expect(res.body.response.statusCode).to.equal('201');
                    expect(res.body.response.result).to.be.an('array');
                    done();
                });
        })
    });

    // Test on get all trails by user_id
    describe('/GET readTrailit_trails_data_tour/:user_id', () => {
        
        // Read all trails
        it ('should get all trails in array', (done) => {

            chai.request(server)
                .get('/trailit/api/v1/userTourDataDetail/readTrailit_trails_data_tour/' + user_id)
                .end((err, res) => {
                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result).to.be.an('array');
                    done();
                });
        });
    });

    // Test on get single trailit detail api
    describe('/GET readTrailit_detail_tour/:trail_data_id', () => {

        // Read single trailit detail
        it ('should get single trailit detail by id', (done) => {
            console.log('trail_data_id', trail_data_id);

            chai.request(server)
                .get('/trailit/api/v1/userTourDataDetail/readTrailit_trail_data_tour/' + trail_data_id)
                .end((err, res) => {
                    
                    console.log('line: 79', res.body);
                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result).to.be.an('object');
                    expect(res.body.response.result).to.have.property('trail_id');
                    done();
                });
        });
    });

    // // Test on update trailit detail api
    // describe('/PUT updateTrailit_detail_tour/:trail_data_id', () => {

    //     // Update trailit detail
    //     it ('should update trailit detail by id', (done) => {

    //         chai.request(server)
    //             .put('/trailit/api/v1/userTourDetail/updateTrailit_detail_tour/' + trail_data_id)
    //             .send(trailDataUpdate)
    //             .end((err, res) => {

    //                 // console.log('line: 98', res.body);
    //                 expect(res.body.response.statusCode).to.equal('200');
    //                 expect(res.body.response.result.title).to.equal(trailDataUpdate.updateValue.title);
    //                 expect(res.body.response.result.description).to.equal(trailDataUpdate.updateValue.description);
    //                 done();
    //             });
    //     });
    // });

    // Test on delete trail
    describe('/DELETE deleteTrailit_trail_data_tour/:trail_data_id', () => {

        // Delete trailit detail
        it ('should delete trailiit detail by id', (done) => {            

            chai.request(server)
                .delete('/trailit/api/v1/userTourDataDetail/deleteTrailit_trail_data_tour/' + trail_data_id)
                .end((err, res) => {

                    // console.log('line: 116', res.body);
                    expect(res.body.response.statusCode).to.equal('200');
                    expect(res.body.response.result.message).to.equal('Trail data deleted!');
                    expect(res.body.response.result.count).to.equal(1);
                    done();
                });
        });
    });
};
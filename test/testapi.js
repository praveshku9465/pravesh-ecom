const expect  = require('chai').expect;
const request = require('request');

it('Product API status', function(done) {
    request('http://localhost:5000/api/product/' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Check Product API items', function(done) {
    request('http://localhost:5000/api/product/' , function(error, response, body) {
        expect(response.body.length).to.not.equal(0);
        done();
    });
});

it('Category API status', function(done) {
    request('http://localhost:5000/api/category/' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Check Category API Item', function(done) {
    request('http://localhost:5000/api/category/' , function(error, response, body) {
        expect(response.body.length).to.not.equal(0);
        done();
    });
});

it('Specific Category Product API status', function(done) {
    request('http://localhost:5000/api/product/5f3d77e6255dc465579c8097' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
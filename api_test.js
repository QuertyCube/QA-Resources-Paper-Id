import axios from 'axios';
import { expect } from 'chai';

describe('API Testing with Reqres', () => {
    let response;

    before(async () => {
        // Send GET request to the API before running the tests
        response = await axios.get('https://reqres.in/api/users', {
            headers: {
                accept: 'application/json',
            },
        });
    });

    it('should return a valid response object', () => {
        // Inspect the response object
        expect(response).to.be.an('object');
        expect(response).to.have.property('status');
        expect(response).to.have.property('data');
    });

    it('should return status 200 OK', () => {
        // Verify HTTP status code
        expect(response.status).to.equal(200);
    });

    it('should validate the user length in the response body', () => {
        // Verify response body contains data and validate user length
        expect(response.data).to.have.property('data');
        expect(response.data.data).to.be.an('array');
        expect(response.data.data.length).to.be.greaterThan(0); // Ensure users exist
    });
});
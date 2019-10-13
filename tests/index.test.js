const axios = require('axios')
const { get_request, findServer } = require('../index');

jest.mock('axios');

describe('get_request function', () => {

    test('should resolve a promise successfully with a response object not equal to null', async () => {
        const mock_server = {
            'url': 'http://google.com',
            'priority': 2
        }
        const mock_respone = {
            data: {},
            status: 200,
            statusText: 'OK'
        };

        axios.get.mockImplementationOnce((mock_server) => Promise.resolve(mock_respone));

        return expect(get_request(mock_server)).resolves.toEqual({
            server: mock_server,
            response: mock_respone
        })
    })



    test('response object equal to null when server responded with a status code that falls out of the range of 2xx', async () => {
        const mock_server = {
            'url': 'http://google.com',
            'priority': 2
        }

        const mock_response = {
            response: {
                status: 400
            }
        }

        // change the error
        axios.get.mockImplementationOnce((mock_server) => Promise.reject(mock_response));

        return expect(get_request(mock_server)).resolves.toEqual({
            server: mock_server,
            response: null
        })
    })

    test('response object equal to null when request was made but no response was received', async () => {
        const mock_server = {
            'url': 'http://google.com',
            'priority': 2
        }

        const mock_response = {
            request: {}
        }

        // change the error
        axios.get.mockImplementationOnce((mock_server) => Promise.reject(mock_response));

        return expect(get_request(mock_server)).resolves.toEqual({
            server: mock_server,
            response: null
        })
    })
});


describe('findServer function', () => {

});
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

        axios.get.mockImplementationOnce(() => Promise.resolve(mock_respone));

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

        axios.get.mockImplementationOnce(() => Promise.reject(mock_response));

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

        axios.get.mockImplementationOnce(() => Promise.reject(mock_response));

        return expect(get_request(mock_server)).resolves.toEqual({
            server: mock_server,
            response: null
        })
    });
});


describe('findServer function', () => {
    test('should return the amazon server', async() =>{
        const mock_responses = [
            { data: {'here': true}, status: 200, statusText: 'OK' },
            { request: {} },
            { data: { 'here': true}, status: 200, statusText: 'OK' }
        ]

        axios.get
            .mockImplementationOnce(() => Promise.resolve(mock_responses[0]))
            .mockImplementationOnce(() => Promise.reject(mock_responses[1]))
            .mockImplementationOnce(() => Promise.resolve(mock_responses[2]));

        return expect(findServer()).resolves.toEqual({
            "url": "http://amazon.com",
            "priority": 1
        })
    });

    test('should return the facebook server', async () => {
        const mock_responses = [
            { data: { 'here': true }, status: 200, statusText: 'OK' },
            { data: { 'here': true }, status: 200, statusText: 'OK' },
            { request: {} }
        ]

        axios.get
            .mockImplementationOnce(() => Promise.resolve(mock_responses[0]))
            .mockImplementationOnce(() => Promise.resolve(mock_responses[1]))
            .mockImplementationOnce(() => Promise.reject(mock_responses[2]));

        return expect(findServer()).resolves.toEqual({
            "url": "http://facebook.com",
            "priority": 2
        })
    });

    test('should throw an error and rejects the promise as no server is online', async () => {
        const mock_responses = [
            { response: {status: 500} },
            { request: {} },
            { request: {} }
        ]

        axios.get
            .mockImplementationOnce(() => Promise.reject(mock_responses[0]))
            .mockImplementationOnce(() => Promise.reject(mock_responses[1]))
            .mockImplementationOnce(() => Promise.reject(mock_responses[2]));
        
        return expect(findServer()).rejects.toThrow('All servers are unavailable');
    });
 
});
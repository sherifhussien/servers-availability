const axios = require('axios').default; // Promise based HTTP client
const servers = require('./servers'); // list of servers

// setup the global config
axios.defaults.timeout = 5000;

async function get_request(server){
    let response = null;
    try{
        response = await axios.get(server.url);
    }catch(error){
        if(error.response){
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.error(`${server.url} responded with a status code: ${error.response.status}`);
        }else if(error.request){
            // The request was made but no response was received
            console.error('The request was made but no response was received')
        }else{
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
    }
    return {
        server,
        response
    }
}

async function findServer(){
    const requests = servers.map(s => get_request(s))
    const responses = await Promise.all(requests);
    const online_servers = responses.filter(r => r.response!=null).map(response => response.server);
    
    if(!online_servers.length){
        throw new Error('All servers are unavailable');
    }

    const lowest_priority_server = online_servers.reduce((acc, curr) => (acc.priority < curr.priority)?acc:curr);
    return lowest_priority_server;
}

// findServer().then(res => {}).catch(err => {})

module.exports = {
    findServer,
    get_request
}
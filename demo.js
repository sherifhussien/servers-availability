const { findServer } = require('./index')

findServer()
    .then(response => {
        console.log('Server:', response);
    })
    .catch(err => {
        console.log(err);
    })
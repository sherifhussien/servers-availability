# Server Availabilty

A node module that determines the availability of a given list of servers and then returns an available server with the lowest priority number.

## Getting Started

These instructions will get you the project up and running on your local machine for development and testing purposes

### Prerequisites

Install both node and npm on your local machine.

To make sure they were installed successfully, type the following on your terminal:

```
$ node -v
$ npm -v
```


## Setup

navigate to the server-availability directory
```
$ cd <path_to_server-availability>
```

install dependecies
```
$ npm install
```

## Testing

To run the unit tests, type the following on your terminal:
```
$ npm test
```
check the logs to see if all tests are passed or not

## How to use

The demo.js file require the implemented module and use it to check online servers, so feel free to change the logic of either resolving or rejecting the Promise generated from the findServer()

You can modify the servers.json file and add more servers to work on or change the priorities of the servers for the __development__ property list only.

Any changes to the __test__ property list will make the tests fail.

Then on the terminal, type the following:
```
$ npm start
```
or

```
$ npm run watch
```

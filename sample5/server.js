const url = require('url')
const address = 'http://localhost:8080/test.html?name=arash&family=altafi'

const q = url.parse(address, true)

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/test.html'
console.log(q.search); //returns '?name=arash&family=altafi'

var qdata = q.query; //returns an object: { name: arash, family: 'altafi' }
console.log(qdata); //returns an object: { name: arash, family: 'altafi' }
console.log(qdata.name); //returns 'arash'
console.log(qdata.family); //returns 'altafi'
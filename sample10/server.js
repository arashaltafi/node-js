const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', (a, b) => {
    console.log('scream', a + b);
})

setTimeout(() => {
    console.log("in time out")
    eventEmitter.emit('scream', 8, 7)
}, 1000);

console.log('in body');

let x = 0
var interval = setInterval(() => {
    x++;
    if (x >= 10) {
        clearInterval(interval)
    }
    console.log(`x = ${x}`);
}, 1000);
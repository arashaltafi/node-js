setTimeout(() => {
    console.log('hello after 1 sec');
}, 1000);

const interval = setInterval(() => {
    console.log('hello every 1 sec');
}, 1000);

setTimeout(() => {
    clearInterval(interval);
}, 5000);

console.log("dirname", __dirname)
console.log("filename", __filename)
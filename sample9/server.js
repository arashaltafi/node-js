console.log(global);
console.log("file name", __filename);
console.log("direction name", __dirname);
console.log(process);

console.log(process.platform);
console.log(process.env.OS);
console.log(process.env.USERNAME);

//create variable in global like this ====> (   a = 2    )


process.on('exit', (code) => {
    console.log('About To Exit With Code:', code);
})
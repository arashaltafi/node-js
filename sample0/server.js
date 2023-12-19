const cow = require("cowsay");
const cow2 = require('cowsay2');
const whale = require('cowsay2/cows/whale');
const usa = require('cowsay2/cows/USA');
const npmCowSayLog = require('npmsample-arash/cow')

console.log(
    cow.think({
        text: "Hello First Project From NodeJS",
        e: "oO",
        T: " U "
    })
);

console.log(
    cow2.say(
        "Hello First Project From NodeJS", {
        cow: whale
    })
);

console.log(
    cow2.say(
        "Hello First Project From NodeJS", {
        cow: usa
    })
);

npmCowSayLog.logWithCow('this is test!')
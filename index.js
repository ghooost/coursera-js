//const add = require('./module.js');
//console.log(add);


// var EventEmitter = require('events').EventEmitter;
// var emitter = new EventEmitter();
//
// emitter.on('hello', console.log);
//
// emitter.emit('error', 'Hello!');

for (let i = 0; i < 5; i++) {
    let counter = require('./module.js')();

    console.log(counter);
}

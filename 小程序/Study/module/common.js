function sayHello(name) {
  console.log(`Hello ${name}!`);
}

function sayGoodBye(name) {
  console.log(`GoodBye ${name}~`);
}

// module.exports.sayHello = sayHello;
// exports.sayGoodBye = sayGoodBye;
export {
  sayHello,
  sayGoodBye
}

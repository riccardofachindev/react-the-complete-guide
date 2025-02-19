import * as words from "./utils.js";

console.log(words.apiKey);

// destructuring
const [name, surname] = ['ric', 'fac'];

const { name: name2, surname: surname2 } = {
    name: 'dan',
    surname: 'brown'
}

function makeName({ name, surname }) {
    console.log('Name is', name + surname);
}

console.log(name);
console.log(surname);

console.log(name2);
console.log(surname2);

makeName({ name: 'gian', surname: 'pinot' })

// spread
const array1 = [1, 2, 3];
const newArray = [4, 5, ...array1];

const obj1 = { city: 'NY', country: 'USA' };
const newObj = {
    continent: 'North America',
    ...obj1
}

console.log(newArray);
console.log(newObj);

// function as value
function greeter(inputFn) {
    inputFn();
}

greeter(() => console.log('hi'));
// a) Use of a for loop - filling an array with random numbers
let arr = [];

for (let i = 0; i < 10; i++) {
    arr.push(Math.random()*50);
}

console.log(arr);

// b) Use of a while loop - Binary search

function binarySearch(arr, value) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let guess = arr[mid];

        if (guess === value) {
            return mid;
        } else if (guess > value) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return -1;
}

console.log(binarySearch(arr, 10));

// c) Use of a for .. in loop - iterating over an object

let obj = {
    name: "Donald Trump",
    age: 120,
    city: "Ottawa"
};

for (let key in obj) {
    console.log(key + ": " + obj[key]);
}

// d) Use of a for .. of loop - iterating over an array - palindrome check

function isPalindrome(str) {
    let arr = str.split("");
    let reversed = [];

    for (let char of arr) {
        reversed.unshift(char);
    }

    return reversed.join("") === str;
}

console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));

// e) Use of an if instruction - checking if a number is even

function isEven(num) {
    return num % 2 === 0;
}

console.log(isEven(4));
console.log(isEven(5));

// f) A function taking two or more parameters, checking whether they are numbers and doing some numeric operations on them,
// or, if impossible, returning an error (bonus points for using reducing operation from functional programming)

function sum(...args) {
    if (args.some(arg => typeof arg !== "number")) {
        throw new Error("All arguments must be numbers");
    }

    if (args.length === 0) {
        return 0;
    }

    return args.reduce((a, b) => a + b);
}

console.log(sum(1, 2, 3));
console.log(sum(1, 2, "3"));
console.log(sum());

// g) Function taking a variable amount of parameters and doing something useful with them

function average(...args) {
    let sum = 0;

    for (let num of args) {
        sum += num;
    }

    return sum / args.length;
}

console.log(average(1, 2, 3, 4, 5));

// h) A function taking a function as a parameter and doing something with it + two example functions that make sense with the context of passing it as the parameter

function applyOperation(arr, operation) {
    return arr.map(operation);
}

function square(num) {
    return num * num;
}

function triple(num) {
    return num * 3;
}

console.log(applyOperation([1, 2, 3], square));
console.log(applyOperation([1, 2, 3], triple));

// i) Using a constructor to create objects – objects should have at least three differently typed fields and 1 method doing something
function AnimeCharacter(name, powerLevel, hasMagic) {
    this.name = name;
    this.powerLevel = powerLevel;
    this.hasMagic = hasMagic;

    this.displayCharacterInfo = function() {
        console.log(`Name: ${this.name}, Power Level: ${this.powerLevel}, Has Magic: ${this.hasMagic}`);
    };
}

const myCharacter = new AnimeCharacter('Naruto', 9000, true);

myCharacter.displayCharacterInfo();

// j) Using a class to create an object – objects should have at least three fields of different types, a constructor and 1 method

class AnimeCharacter2 {
    constructor(name, affiliation, isProtagonist) {
        this.name = name;
        this.affiliation = affiliation;
        this.isProtagonist = isProtagonist;
    }

    describeCharacter() {
        console.log(`Name: ${this.name}, Affiliation: ${this.affiliation}, Is Protagonist: ${this.isProtagonist}`);
    }
}

const myCharacter2 = new AnimeCharacter2('Luffy', 'Straw Hat Pirates', true);

myCharacter2.describeCharacter();


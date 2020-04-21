// Fibonacci challenge using NodeJS.

/*
Here I need to return every fibonacci number until is > 350 in array, then check if this array contains a number passed to isFibonnaci
*/

'use strict'

const holdFibonacci = [0, 1]
const fibonacci = () => {
  if (holdFibonacci[holdFibonacci.length - 1] < 350) {
    holdFibonacci.push((holdFibonacci[holdFibonacci.length - 1]) + (holdFibonacci[holdFibonacci.length - 2]))
    fibonacci()
  }
  return holdFibonacci
}

const isFibonnaci = (num) => holdFibonacci.includes(num)

module.exports = {
  fibonacci,
  isFibonnaci
}


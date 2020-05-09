'use strict'

const fibonacci = () => {
  const holdFibonacci = [0, 1]
  while (holdFibonacci[holdFibonacci.length - 1] < 350) {
    holdFibonacci.push((holdFibonacci[holdFibonacci.length - 1]) + (holdFibonacci[holdFibonacci.length - 2]))
  }
  return holdFibonacci
}

const isFibonnaci = (num) => fibonacci().includes(num)

module.exports = {
  fibonacci,
  isFibonnaci
}

'use strict';

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { checkIsValidUserInput } = require('./modules/checkIsValidUserInput');
const { generateRandomNumber } = require('./modules/generateRandomNumber');
const { getBullsAndCows } = require('./modules/getBullsAndCows');
const generated = generateRandomNumber();

const rl = readline.createInterface({ input, output });

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function playGame() {
  // eslint-disable-next-line no-console
  console.log('Guess the 4-digit number with all unique digits.');

  while (true) {
    const answer = await askQuestion('Enter your guess: ');

    if (!checkIsValidUserInput(answer)) {
      // eslint-disable-next-line no-console
      console.log(
        'Invalid input! Enter 4 different digits, first digit not 0.',
      );
      continue;
    }

    const { bulls, cows } = getBullsAndCows(answer, generated);

    if (bulls === 4) {
      // eslint-disable-next-line no-console
      console.log(`Congratulations! You guessed the number ${generated}`);
      break;
    } else {
      // eslint-disable-next-line no-console
      console.log(`Bulls: ${bulls}, Cows: ${cows}`);
    }
  }

  rl.close();
}

playGame();

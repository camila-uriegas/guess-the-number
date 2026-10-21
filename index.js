 import chalk from 'chalk';
import prompts from 'prompts';
import { randomInt } from 'crypto';
import fs from 'fs';

const MIN = 1;
const MAX = 10;
const MAX_ATTEMPTS = 3;
const secret = randomInt(MIN, MAX + 1);

const log = [];
function output(message, colorFn = (s) => s) {
    console.log(colorFn(message));
    log.push(message);
}

output(`Guess the Number!`, chalk.magenta.bold);
output(`Guess a number between ${MIN} and ${MAX}.`);
output(`You have ${MAX_ATTEMPTS} attempts!`, chalk.cyan);



function validateGuess(input) {
    // if empty
    if (input == undefined || input.trim() === '') {
        throw new Error('A guess is required.');
    }


    const value = Number(input);

    // not a number
    if (!Number.isInteger(value)) {
        throw new Error('Guess must be a whole number.');
    }

    // negative or 0
    if (value < MIN) {
        throw new Error(`Guess must be at least ${MIN}.`);
    }

    // above max
    if (value > MAX) {
        throw new Error(`Guess must be less than ${MAX}.`);
    }
    
    return value;
}

let won = false;

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const response = await prompts({
        type: 'text',
        name: 'guess',
        message: `Attempt ${attempt}/${MAX_ATTEMPTS}: Enter your guess`,
    });

    // cancel game
    if (response.guess === undefined) {
        output('Game cancelled', chalk.red);
        break;
    }

    try {
        const guess = validateGuess(response.guess);

        if (guess === secret) {
            output(`YOU WON! The number was ${secret}`, chalk.green.bold);
            won = true;
            break;
        } else if (guess < secret) {
            output('Too low!', chalk.yellow);
        } else {
            output('Too high!', chalk.yellow);
        } 
    } catch (error) {
        output(error.message, chalk.red);
    }
}

if (!won) {
    output('GAME OVER', chalk.red.bold);
    output(`The secret number was ${secret}`);
}

fs.writeFileSync('game-output.txt', log.join('\n') + '\n');
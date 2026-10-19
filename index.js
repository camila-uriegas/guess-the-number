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
output(`You have ${MAX_ATTEMPTS} attempts!`, chalk.yellow);

const response = await prompts({
    type: `text`,
    name: `guess`,
    message: `Attempt 1/${MAX_ATTEMPTS}: Enter your guess`,
});
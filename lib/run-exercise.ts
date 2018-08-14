import * as path from 'path';
import * as fs from 'fs';
import { padStart } from 'lodash';
import { argv } from 'yargs';
import chalk from 'chalk';

if (argv._.length !== 1) {
    console.log(chalk.cyan('Usage: npm start <exercise number>'));
} else {
    const exerciseNumber: any = argv._[0];
    const parsedExerciseNumber = (
        typeof exerciseNumber === 'number' ? exerciseNumber :
        typeof exerciseNumber === 'string' ? Number(exerciseNumber.trim()) :
        Number.NaN
    );

    if (!Number.isFinite(parsedExerciseNumber) || parsedExerciseNumber <= 0) {
        console.log(chalk.red(`Error: "${exerciseNumber}" is not a valid exercise number`));
    } else {
        const exerciseModule = `../exercises/exercise-${padStart(parsedExerciseNumber.toString(), 2, '0')}.ts`;
        const exerciseFile = path.join(__dirname, exerciseModule);

        fs.access(exerciseFile, fs.constants.R_OK, (error) => {
            if (error) {
                console.log(chalk.red(`Error: Exercise ${parsedExerciseNumber} does not exist`));
            } else {
                console.log(chalk.cyan(`Running exercise ${parsedExerciseNumber}...\n`));
                require(exerciseModule); // tslint:disable-line:no-var-requires
            }
        });
    }
}

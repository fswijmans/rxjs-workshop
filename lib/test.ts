import { zip, from, interval } from 'rxjs';
import chalk from 'chalk';

const lines = [
    ``,
    ``,
    chalk.magenta(`     ____           _ ____     __    __        __         _        _`),
    chalk.magenta(`    |  _ \\ __  __  | / ___|   / /_   \\ \\      / /__  _ __| | _____| |__   ___  _ __`),
    chalk.magenta(`    | |_) |\\ \\/ /  | \\___ \\  | '_ \\   \\ \\ /\\ / / _ \\| '__| |/ / __| '_ \\ / _ \\| '_ \\`),
    chalk.magenta(`    |  _ <  >  < |_| |___) | | (_) |   \\ V  V / (_) | |  |   <\\__ \\ | | | (_) | |_) |`),
    chalk.magenta(`    |_| \\_\\/_/\\_\\___/|____/   \\___/     \\_/\\_/ \\___/|_|  |_|\\_\\___/_| |_|\\___/| .__/`),
    chalk.magenta(`                                                                              |_|`),
    ``,
    `   -=================================================================================-`,
    ``,
    `    Execute the following command to run an exercise:`,
    ``,
    `    > ${chalk.cyan('npm start <exercise number>')}`,
    ``,
    ``,
];

zip(from(lines), interval(100)).subscribe({
    next: ([line]) => console.log(line),
});

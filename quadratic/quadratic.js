import process, { argv, stderr, stdout } from 'node:process';

const args = argv.slice(2);

const a = Number(args[0]);
const b = args[1] ? Number(args[1]) : 0;
const c = args.length <= 2 ? 0 : Number(args[2]);

if (isNaN(a) || isNaN(b) || isNaN(c)) {
    stderr.write('Please, enter proper numbers');
    process.exit(1);
}

if (a !== 0 && args.length <= 3) {

    stdout.write('Arguments ok\n');

    const discriminant = (b ** 2) - (4 * a * c);
    const srtDiscriminant = Math.sqrt(discriminant);

    if (discriminant > 0) {
        const resultOne = (-b + srtDiscriminant) / (2 * a);
        const resultTwo = (-b - srtDiscriminant) / (2 * a);
        const results = [];
        results.push(resultOne);
        results.push(resultTwo);
        results.sort();
        stdout.write(`There are two roots: ${results[0]} ${results[1]}`);

    } else if (discriminant === 0) {
        const result = -b / (2 * a);
        stdout.write(`There is one root: ${result}`);
    } else {
        stdout.write('There are no roots\n');
    }

    process.exit(0);

} else if (args.length > 3) {

    stderr.write('More than three arguments detected');
    process.exit(1);

} else {

    if (a === 0) {
        stderr.write('The first argument should not be zero');
    } else {
        stderr.write('You need to enter at least one first argument');
    }

    process.exit(1);

}
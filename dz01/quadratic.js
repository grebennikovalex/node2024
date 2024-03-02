import process, { argv, stderr, stdout } from 'node:process';

const args = argv.slice(2);

if (args.length > 3) {
    stderr.write('More than three arguments detected\n');
    process.exit(1);
}

if (!args.length) {
    stderr.write('You need to enter at least one first argument\n');
    process.exit(1);
}

const a = Number(args[0]);
const b = args[1] ? Number(args[1]) : 0;
const c = args.length <= 2 ? 0 : Number(args[2]);

if (isNaN(a) || isNaN(b) || isNaN(c)) {
    stderr.write('Please, enter proper numbers\n');
    process.exit(1);
}

if (a === 0) {
    stderr.write('The first argument should not be zero\n');
    process.exit(1);
} else {
    stdout.write('Arguments ok\n');
    const discriminant = (b ** 2) - (4 * a * c);

    if (discriminant > 0) {
        const sqrtDiscriminant = Math.sqrt(discriminant);
        const results = [(-b + sqrtDiscriminant) / (2 * a), (-b - sqrtDiscriminant) / (2 * a)];
        results.sort();
        stdout.write(`There are two roots: ${results[0].toFixed(2)} ${results[1].toFixed(2)}\n`);
    } else if (discriminant === 0) {
        const result = -b / (2 * a);
        stdout.write(`There is one root: ${result.toFixed(2)}\n`);
    } else {
        stdout.write('There are no roots\n');
    }

    process.exit(0);
}
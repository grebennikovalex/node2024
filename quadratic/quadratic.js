import process, { argv, stderr, stdout } from 'node:process';

const args = argv.slice(2);

if (Number(args[0]) && args.length <= 3) {

    stdout.write('Arguments ok\n');

    const a = Number(args[0]);
    const b = args[1] ? Number(args[1]) : 0;
    const c = args.length <= 2 ? 0 : Number(args[2]);

    const discriminant = (b ** 2) - (4 * a * c);

    if (discriminant > 0) {
        const resultOne = (-b + Math.sqrt(discriminant)) / (2 * a);
        const resultTwo = (-b - Math.sqrt(discriminant)) / (2 * a);
        stdout.write(`There are two roots: ${resultOne} ${resultTwo}`);
        // TODO: always show the roots ascending, i.e -> -1 0 not 0 -1
    } else if (discriminant === 0) {
        const result = -b / (2 * a);
        stdout.write(`There is one root: ${result}`);
    } else {
        stdout.write('There are no roots\n');
    }

    process.exit(0);

} else if (args.length > 3) {

    stderr.write('More than three arguments detected')
    process.exit(1);

} else {

    stderr.write('You need to enter at least one first argument')
    process.exit(1);

}
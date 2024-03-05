import process from 'node:process';

const envObject = Object.entries(process.env);
const filteredEnv = envObject.filter((entry) => entry[0].slice(0, 2) === 'DB');

console.log('ENV:', Object.fromEntries(filteredEnv));

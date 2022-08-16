import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const allResults = [ "It's a Draw", "Alice Wisn!", "Bob Wins!", "No Result" ];
const isAlice = await ask.ask(
  `Are you Alice?`,
  ask.yesno
);
const who = isAlice ? 'Alice' : 'Bob';

console.log(`Playing as ${who}`);

let acc = null;
const createAcc = await ask.ask(
  `Would you like to create an account on devnet?`,
  ask.yesno
);
if (createAcc) {
  acc = await stdlib.newTestAccount(stdlib.parseCurrency(1100));
} else {
  const secret = await ask.ask(
    `What is your account secret?`,
    (x => x)
  );
  acc = await stdlib.newAccountFromSecret(secret);
}


await Promise.all([
  backend.Alice(ctcAlice, {
    ...stdlib.hasRandom,
    // implement Alice's interact object here
  }),
  backend.Bob(ctcBob, {
    ...stdlib.hasRandom,
    // implement Bob's interact object here
  }),
]);

console.log('Goodbye, Alice and Bob!');

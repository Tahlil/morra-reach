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


let ctc = null;
if (isAlice) {
  ctc = acc.contract(backend);
  ctc.getInfo().then((info) => {
    console.log(`The contract is deployed as = ${JSON.stringify(info)}`); });
} else {
  const info = await ask.ask(
    `Please paste the contract information:`,
    JSON.parse
  );
  ctc = acc.contract(backend, info);
}

const fmt = (x) => stdlib.formatCurrency(x, 5);
const getBalance = async () => fmt(await stdlib.balanceOf(acc));

const before = await getBalance();
console.log(`${who}'s balance is ${before}`);

const interact = { ...stdlib.hasRandom };

interact.confirmTimeOut = () => {
  console.log(`Timeout occured.`);
  process.exit(1);
};

interact.getFingers = async () => {

}

interact.sayNumber = async () => {
  
}

interact.showResult = async () => {
  
}

const part = isAlice ? ctc.p.Alice : ctc.p.Bob;
await part(interact);

const after = await getBalance();
console.log(`${who}'s balance is now ${after}`);

ask.done();

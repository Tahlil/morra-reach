import { loadStdlib, ask } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();

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
 let fingers = -1;
 while(fingers < 0 || fingers > 5){
  fingers = await ask.ask(`How many fingers would you show?`, 
  parseInt);
 }
 return fingers;
}

interact.sayNumber = async () => {
  let number = -1;
  while(number < 0){
    number = await ask.ask(`What's the total?`, 
    parseInt);
 }
 return number;
}

interact.showResult = async (res) => {
  console.log(`The result it ${allResults[result]}`);
}

const part = isAlice ? ctc.p.Alice : ctc.p.Bob;
await part(interact);

const after = await getBalance();
console.log(`${who}'s balance is now ${after}`);

ask.done();

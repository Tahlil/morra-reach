'reach 0.1';

const [ isResult, B_WINS, DRAW, A_WINS, NO_RESULT ] = makeEnum(4);

const MorraPlayer = {
  ...hasRandom,
  getFingers: Fun([], UInt),
  sayNumber: Fun([], UInt),
  getResult: Fun([UInt, UInt], Bool), // return true if there is a result otherwise will return false
  confirmTimeOut: Fun([], Null)
} 

export const main = Reach.App(() => {
  // USE API later
  // const MP = API('MorraPlayer', {
  //   ...hasRandom,
  //   showFingers: Fun([], UInt),
  //   tellNumber: Fun([], UInt),
  //   showResult: Fun([UInt], Null)
  // });
  const deadline = 10;
  

  const Alice = Participant('Alice', {
    ...MorraPlayer,
  });

  const Bob = Participant('Bob', {
    ...MorraPlayer,
  });
 
  init();

  const confirmTimeOut = () => {
    each([Alice, Bob], () => {
      interact.confirmTimeOut();
    });
  };
  Alice.publish();
  commit();
  Bob.publish();

  var result = DRAW;
  invariant(balance() == 0 && isResult(result))
  while (result == DRAW || result == NO_RESULT) {
    commit();
    Alice.only(() => {
      const _fingersAlice = interact.getFingers();
      const [_commitFingerAlice, _saltFingerAlice] = makeCommitment(interact, _fingersAlice);
      const commitFingerAlice = declassify(_commitFingerAlice);
    });
    Alice.publish(commitFingerAlice);
    commit();
    Bob.only(() => {
      const _fingersBob = interact.getFingers();
      const [_commitFingerBob, _saltFingerBob] = makeCommitment(interact, _fingersBob);
      const commitFingerBob = declassify(_commitFingerBob);
    });
    Bob.publish(commitFingerBob);
    commit();
    Alice.only(() => {
      const _numberAlice = interact.sayNumber();
      const [_commitNumberAlice, _saltAlice] = makeCommitment(interact, _numberAlice);
      const commitNumberAlice = declassify(_commitNumberAlice);
    });
    Alice.publish(commitNumberAlice);

  }

  

  // write your program here
  exit();
});

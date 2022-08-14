'reach 0.1';

const MorraPlayer = {
  ...hasRandom,
  getFingers: Fun([], UInt),
  sayNumber: Fun([], UInt),
  getResult: Fun([UInt, UInt], Bool) // return true if there is a result otherwise will return false
} 

export const main = Reach.App(() => {
  // USE API later
  // const MP = API('MorraPlayer', {
  //   ...hasRandom,
  //   showFingers: Fun([], UInt),
  //   tellNumber: Fun([], UInt),
  //   showResult: Fun([UInt], Null)
  // });

  const Alice = Participant('Alice', {
    ...MorraPlayer,
  });

  const Bob = Participant('Bob', {
    ...MorraPlayer,
  });
 
  init();
  
  commit();
  // write your program here
  exit();
});

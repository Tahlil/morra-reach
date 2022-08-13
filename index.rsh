'reach 0.1';

export const main = Reach.App(() => {
  const MP = API('MorraPlayer', {
    ...hasRandom,
    showFingers: Fun([], UInt),
    tellNumber: Fun([], UInt),
    showResult: Fun([UInt], Null)
  });
  init();
  
  commit();
  // write your program here
  exit();
});

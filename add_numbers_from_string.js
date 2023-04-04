// nput string =  " 19.2acb1999 buy$23.004yyu456e089rr7"
// Get a sum of all whole numbers from the given string.
// eg: [ '19', '1999', '23', '456', '089', '7' ] = 115687 (sum of all whole numbers)

const str = "19.2acb1999 buy$23.004yyu456e089rr7";
const numbers = str.match(/\d+(\.\.d+)?/g);
let count = 0;
numbers.map(el => {
  count+=Number(el)
});
console.log(count)

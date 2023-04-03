const str = "19.2acb1999 buy$23.004yyu456e089rr7";
const numbers = str.match(/\d+(\.\.d+)?/g);
let count = 0;
numbers.map(el => {
  count+=Number(el)
});
console.log(count)
const lib = require('./src/beverageLib.js').lib;

const main = function() {
  console.log('Anna Juice Ltd');
  let getTransactionDetails = lib.createTransaction(process.argv);
  let message = lib.performTransaction(getTransactionDetails);
  console.log(message);
};

main();

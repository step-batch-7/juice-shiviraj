const lib = require('./src/beverageLib.js').lib;
const recordFile = './juiceRecord/juiceRecords.json';

const main = function() {
  console.log('Anna Juice Ltd');
  let getTransactionDetails = lib.createTransaction(process.argv);
  let message = lib.performTransaction(getTransactionDetails, recordFile);
  console.log(message);
};

main();

const lib = require('./src/beverageLib.js').lib;
const processTransaction = require('./src/processTransaction')
  .processTransaction;
const recordFile = './juiceRecord/juiceRecords.json';

const main = function() {
  console.log('Anna Juice Ltd');
  let transactionDetails = lib.getTransactionDetails(process.argv);
  let message = processTransaction(transactionDetails, recordFile);
  console.log(message);
};

main();

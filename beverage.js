const getTransactionDetails = require('./src/beverageLib.js')
  .getTransactionDetails;
const processTransaction = require('./src/beverageLib').processTransaction;
const recordFile = './juiceRecord/juiceRecords.json';

const main = function() {
  console.log('Anna Juice Ltd');
  const transactionDetails = getTransactionDetails(process.argv);
  console.log(transactionDetails);
  const message = processTransaction(transactionDetails, recordFile);
  console.log(message);
};

main();

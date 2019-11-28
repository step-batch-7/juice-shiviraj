const getTransactionDetails = require('./src/beverageLib.js')
  .getTransactionDetails;
const processTransaction = require('./src/beverageLib').processTransaction;
const recordFile = './juiceRecord/juiceRecords.json';
const fs = require('fs');

const main = function() {
  console.log('Anna Juice Ltd');
  const transactionDetails = getTransactionDetails(process.argv);
  const date = new Date();
  const message = processTransaction(transactionDetails, recordFile, date, fs);
  console.log(message);
};

main();

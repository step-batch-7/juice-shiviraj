const fs = require('fs');
const getTransactionDetails = require('./src/beverageLib.js')
  .getTransactionDetails;
const processTransaction = require('./src/beverageLib').processTransaction;

const main = function() {
  console.log('Anna Juice Ltd');
  const transactionDetails = getTransactionDetails(process.argv);
  const date = new Date();
  const filePath = './juiceRecord/juiceRecords.json';
  const message = processTransaction(transactionDetails, filePath, date, fs);
  console.log(message);
};

main();

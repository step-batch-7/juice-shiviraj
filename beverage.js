const fs = require('fs');
const {
  getTransactionDetails,
  processTransaction
} = require('./src/beverageLib.js');
const { getDate, getDataStorePath } = require('./src/config');

const main = function() {
  const transactionDetails = getTransactionDetails(process.argv);
  const path = getDataStorePath(process.env);
  const dateWithEnv = getDate(process.env);
  const message = processTransaction(transactionDetails, path, dateWithEnv, fs);
  console.log(message);
};

main();

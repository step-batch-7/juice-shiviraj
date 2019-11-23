const updateTransaction = require('./updateRecords.js').updateTransaction;
const getDetails = require('./queryTransaction.js').getDetails;

const getTransactionDetails = function(details) {
  const transactionDetails = { action: details[2], empID: details[4] };
  if (details.includes('--save')) {
    transactionDetails.beverage = details[4];
    transactionDetails.empID = details[6];
    transactionDetails.qty = details[8];
    const date = new Date();
    transactionDetails.date = date.toJSON();
  }
  return transactionDetails;
};

const processTransaction = function(details, recordFile) {
  const process = { '--save': updateTransaction, '--query': getDetails };
  const operation = process[details.action];
  if (operation != undefined) return operation(details, recordFile);
  return 'Cammand not implemented';
};

exports.getTransactionDetails = getTransactionDetails;
exports.processTransaction = processTransaction;

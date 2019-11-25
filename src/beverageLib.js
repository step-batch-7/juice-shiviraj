const updateTransaction = require('./updateRecords.js').updateTransaction;
const getDetails = require('./queryTransaction.js').getDetails;

const getTransactionDetails = function(details) {
  const transactionDetails = {};
  const length = details.length;
  if ([5, 9].includes(length)) {
    const empID = details[details.lastIndexOf('--empId') + 1];
    transactionDetails.empID = empID;
    if (details.includes('--query')) {
      transactionDetails.action = '--query';
    }
    if (details.includes('--save')) {
      transactionDetails.action = '--save';
      const beverage = details[details.lastIndexOf('--beverage') + 1];
      const qty = details[details.lastIndexOf('--qty') + 1];
      transactionDetails.beverage = beverage;
      transactionDetails.qty = qty;
      const date = new Date();
      transactionDetails.date = date.toJSON();
    }
  }
  return transactionDetails;
};

const processTransaction = function(details, recordFile) {
  const process = { '--save': updateTransaction, '--query': getDetails };
  const operation = process[details.action];
  if (operation != undefined) return operation(details, recordFile);
  return 'Invalid cammand';
};

exports.getTransactionDetails = getTransactionDetails;
exports.processTransaction = processTransaction;

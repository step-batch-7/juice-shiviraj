const updateTransaction = require('./updateRecords.js').updateTransaction;

const createTransaction = function(details) {
  details = details.slice(2);
  let transactionDetails = {};
  transactionDetails.action = details[0];
  transactionDetails.empID = details[2];
  if (details.includes('--save')) {
    transactionDetails.beverage = details[2];
    transactionDetails.empID = details[4];
    transactionDetails.qty = details[6];
    let date = new Date();
    transactionDetails.date = date.toJSON();
  }
  return transactionDetails;
};

const performTransaction = function(details) {
  let message = 'Cammand not implemented';
  if (details.action == '--save') return updateTransaction(details);
  //if (details.action == '--query') return getDetails(details);
  return message;
};

const lib = {};
lib.performTransaction = performTransaction;
lib.createTransaction = createTransaction;
exports.lib = lib;

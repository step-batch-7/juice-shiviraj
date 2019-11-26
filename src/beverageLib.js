const updateTransaction = require('./updateRecords.js').updateTransaction;
const getDetails = require('./queryTransaction.js').getDetails;

const makeObject = function(details) {
  const validOption = ['--beverage', '--qty', '--date', '--empId'];
  const action = ['--query', '--save'];
  return function(object, key, index) {
    if (action.includes(key)) {
      object.action = key;
    }
    if (validOption.includes(key)) {
      object[key] = details[index + 1];
    }
    return object;
  };
};

const getTransactionDetails = function(details) {
  details = details.slice(2);
  return details.reduce(makeObject(details), {});
};

const processTransaction = function(details, recordFile) {
  const process = { '--save': updateTransaction, '--query': getDetails };
  const operation = process[details.action];
  if (operation != undefined) return operation(details, recordFile);
  return 'Invalid cammand';
};

exports.getTransactionDetails = getTransactionDetails;
exports.processTransaction = processTransaction;

/*const transactionDetails = {};
  const length = details.length;
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
  return transactionDetails;*/

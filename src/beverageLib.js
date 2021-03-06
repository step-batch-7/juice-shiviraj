const updateTransaction = require('./updateRecords.js').updateTransaction;
const getDetails = require('./queryTransaction.js').getDetails;

const makeObject = function(details) {
  const validOption = '--beverage,--qty,--date,--empId'.split(',');
  const action = '--query,--save'.split(',');
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

const processTransaction = function(details, recordFile, date, fs) {
  const process = { '--save': updateTransaction, '--query': getDetails };
  const operation = process[details.action];
  if (operation != undefined) return operation(details, recordFile, fs, date);
  return 'Invalid cammand';
};

exports.getTransactionDetails = getTransactionDetails;
exports.processTransaction = processTransaction;

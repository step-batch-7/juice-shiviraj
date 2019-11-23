const updateTransaction = require('./updateRecords.js').updateTransaction;
const getDetails = require('./queryTransaction.js').getDetails;

const processTransaction = function(details, recordFile) {
  let message = 'Cammand not implemented';
  if (details.action == '--save') return updateTransaction(details, recordFile);
  if (details.action == '--query') return getDetails(details, recordFile);
  return message;
};

exports.processTransaction = processTransaction;

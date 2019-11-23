const fs = require('fs');

const readRecords = function(file) {
  let records = fs.readFileSync(file, 'utf8');
  return JSON.parse(records);
};

const getTransactionDetails = function(details) {
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

const lib = {};
lib.readRecords = readRecords;
lib.getTransactionDetails = getTransactionDetails;
exports.lib = lib;

const fs = require('fs');

const readRecords = function() {
  let records = fs.readFileSync('./juiceRecord/juiceRecords.json', 'utf8');
  return JSON.parse(records);
};

const updateTransaction = function(details) {
  let oldRecords = readRecords();
  //updateRecords(details);
  let message =
    'Transaction Recorded:\n' +
    'Employee ID,Beverage,Quantity,Date\n' +
    details.empID +
    ',' +
    details.beverage +
    ',' +
    details.qty +
    ',' +
    details.date;
  return message;
};

exports.updateTransaction = updateTransaction;

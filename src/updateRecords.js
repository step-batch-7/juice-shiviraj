const fs = require('fs');

const readRecords = function() {
  let records = fs.readFileSync('./juiceRecord/juiceRecords.json', 'utf8');
  return JSON.parse(records);
};

const updateRecords = function(details) {
  let records = readRecords();
  let record = {
    beverage: details.beverage,
    qty: details.qty,
    date: details.date
  };
  if (records[details.empID] == undefined) {
    records[details.empID] = [];
  }
  records[details.empID].push(record);
  let updatedRecord = JSON.stringify(records);
  fs.writeFileSync('./juiceRecord/juiceRecords.json', updatedRecord, 'utf8');
};

const updateTransaction = function(details) {
  let oldRecords = readRecords();
  updateRecords(details);
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

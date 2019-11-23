const fs = require('fs');

const readRecords = function(path) {
  let records = fs.readFileSync(path, 'utf8');
  return JSON.parse(records);
};

const updateRecords = function(details, path) {
  let records = readRecords(path);
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
  fs.writeFileSync(path, updatedRecord, 'utf8');
};

const updateTransaction = function(details, recordFile) {
  let oldRecords = readRecords(recordFile);
  updateRecords(details, recordFile);
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

exports.readRecords = readRecords;
exports.updateRecords = updateRecords;
exports.updateTransaction = updateTransaction;

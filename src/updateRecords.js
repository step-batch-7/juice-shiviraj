const fs = require('fs');

const readRecords = function(file) {
  const records = fs.readFileSync(file, 'utf8');
  return JSON.parse(records);
};

const makeRecordFormat = function(details) {
  return {
    '--beverage': details['--beverage'],
    '--qty': details['--qty'],
    '--date': details['--date']
  };
};

const updateRecords = function(details, path, empID) {
  const records = readRecords(path);
  const newRecord = makeRecordFormat(details);
  if (records[empID] == undefined) records[empID] = [];
  records[empID].push(newRecord);
  const updatedRecord = JSON.stringify(records);
  fs.writeFileSync(path, updatedRecord, 'utf8');
};

const updateTransaction = function(details, recordFile) {
  updateRecords(details, recordFile, details.empID);
  const title = 'Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n';
  const contents = [
    details['--empId'],
    details['--beverage'],
    details['--qty'],
    details['--date']
  ];
  return title + contents.join(',');
};

exports.readRecords = readRecords;
exports.makeRecordFormat = makeRecordFormat;
exports.updateRecords = updateRecords;
exports.updateTransaction = updateTransaction;

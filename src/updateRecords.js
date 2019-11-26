const readRecords = function(file, fs) {
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

const updateRecords = function(details, path, empId, fs) {
  const records = readRecords(path, fs);
  const newRecord = makeRecordFormat(details);
  if (records[empId] == undefined) {
    records[empId] = [];
  }
  records[empId].push(newRecord);
  const updatedRecord = JSON.stringify(records);
  fs.writeFileSync(path, updatedRecord, 'utf8');
};

const updateTransaction = function(details, recordFile, fs) {
  updateRecords(details, recordFile, details['--empId'], fs);
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

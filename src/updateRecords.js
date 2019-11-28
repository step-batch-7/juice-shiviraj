const readRecords = function(file, fs) {
  const records = fs.readFileSync(file, 'utf8');
  return JSON.parse(records);
};

const makeRecordFormat = function(details) {
  return {
    '--empId': details['--empId'],
    '--beverage': details['--beverage'],
    '--qty': details['--qty'],
    '--date': details['--date']
  };
};

const isUndefined = function(value) {
  return value == undefined;
};

const updateRecords = function(details, path, fs) {
  const records = readRecords(path, fs);
  const newRecord = makeRecordFormat(details);
  let empId = details['--empId'];
  if (isUndefined(records[empId])) {
    records[empId] = [];
  }
  records[empId].push(newRecord);
  const updatedRecord = JSON.stringify(records, null, 2);
  fs.writeFileSync(path, updatedRecord, 'utf8');
};

const areEnoughOption = function(details) {
  return Object.keys(details).length == 4;
};

const updateTransaction = function(details, recordFile, fs, date) {
  if (!areEnoughOption(details)) {
    return [
      'Plese enter all the options in this format',
      'node beverage.js --save --empId 11111 --beverage Banana --qty 1'
    ].join('\n');
  }
  details['--date'] = date;
  updateRecords(details, recordFile, fs);
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
exports.updateTransaction = updateTransaction;

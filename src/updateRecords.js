const loadRecords = function(file, fs) {
  if (!fs.existsSync(file)) return {};
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

const updateRecords = function(details, path, fs) {
  const records = loadRecords(path, fs);
  const newRecord = makeRecordFormat(details);
  let empId = details['--empId'];
  if (!records.hasOwnProperty(empId)) {
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
    date.toJSON()
  ];
  return title + contents.join(',');
};

exports.loadRecords = loadRecords;
exports.updateTransaction = updateTransaction;

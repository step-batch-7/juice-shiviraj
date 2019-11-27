const assert = require('assert');
const readRecords = require('../src/updateRecords.js').readRecords;
const updateTransaction = require('../src/updateRecords.js').updateTransaction;
const makeRecordFormat = require('../src/updateRecords.js').makeRecordFormat;

const fs = {
  readFileSync: function(file) {
    assert.equal(file, 'path');
    return '{}';
  },
  writeFileSync: function(file) {
    assert.equal(file, 'path');
  }
};
const date = new Date('2019-11-26T13:21:28.985Z');

describe('Should check update records', () => {
  it('Should read the records of file', () => {
    let actualValue = readRecords('path', fs);
    let expectedValue = {};
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('Should make details in record format', () => {
    let details = {
      '--empId': '11113',
      '--beverage': 'Banana',
      '--date': '2019-11-23T06:32:39.851Z',
      '--qty': '1'
    };
    let actualValue = makeRecordFormat(details);
    let expectedValue = {
      '--empId': '11113',
      '--beverage': 'Banana',
      '--date': '2019-11-23T06:32:39.851Z',
      '--qty': '1'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('it Should update the records', () => {
    let transaction = {
      action: '--save',
      '--empId': '11111',
      '--beverage': 'Orange',
      '--qty': '1',
      '--date': date.toJSON()
    };
    let actualValue = updateTransaction(transaction, 'path', fs);
    let expectedValue =
      'Transaction Recorded:\n' +
      'Employee ID,Beverage,Quantity,Date\n' +
      '11111,Orange,1,2019-11-26T13:21:28.985Z';
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('it Should update the records', () => {
    let transaction = {
      action: '--save',
      '--empId': '12345',
      '--beverage': 'Orange',
      '--qty': '1',
      '--date': date.toJSON()
    };
    let actualValue = updateTransaction(transaction, 'path', fs);
    let expectedValue =
      'Transaction Recorded:\n' +
      'Employee ID,Beverage,Quantity,Date\n' +
      '12345,Orange,1,2019-11-26T13:21:28.985Z';
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

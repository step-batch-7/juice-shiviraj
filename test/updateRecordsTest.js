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

  it('Should acknowdledge that all input is not given', () => {
    let transaction = {
      action: '--save',
      '--empId': '11111',
      '--beverage': 'Orange'
    };
    let actualValue = updateTransaction(transaction, 'path', fs, date.toJSON());
    let expectedValue =
      'Plese enter all the options in this format\n' +
      'node beverage.js --save --empId 11111 --beverage Banana --qty 1';
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('it Should update the records', () => {
    let transaction = {
      action: '--save',
      '--empId': '11111',
      '--beverage': 'Orange',
      '--qty': '1'
    };
    let actualValue = updateTransaction(transaction, 'path', fs, date.toJSON());
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
      '--qty': '1'
    };
    let actualValue = updateTransaction(transaction, 'path', fs, date.toJSON());
    let expectedValue =
      'Transaction Recorded:\n' +
      'Employee ID,Beverage,Quantity,Date\n' +
      '12345,Orange,1,2019-11-26T13:21:28.985Z';
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

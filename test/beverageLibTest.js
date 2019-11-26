const assert = require('assert');
const processTransaction = require('../src/beverageLib').processTransaction;
const readRecords = require('../src/beverageLib').readRecords;
const getTransactionDetails = require('../src/beverageLib')
  .getTransactionDetails;

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

describe('Test for beverageLib.js', () => {
  it('it Should manipulate the --save transaction', () => {
    let transaction =
      'node,filename,--save,--beverage,Orange,--empId,1111,--qty,1';
    let actualValue = getTransactionDetails(transaction.split(','));
    let expectedValue = {
      action: '--save',
      '--beverage': 'Orange',
      '--empId': '1111',
      '--qty': '1'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('it Should manipulate the --query transaction', () => {
    let transaction = 'node,filename,--query,--empId,1111';
    let actualValue = getTransactionDetails(transaction.split(','));
    let expectedValue = {
      action: '--query',
      '--empId': '1111'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('it Should return invalid cammand for invalid cammand', () => {
    let transaction = 'node,filename,--empId,1111';
    let actualValue = getTransactionDetails(transaction.split(','));
    let expectedValue = { '--empId': '1111' };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

const path = './juiceRecord/onlyForTest.json';

describe('Check processTransaction', () => {
  it('Should return cammand not implemented for invalid cammand', () => {
    let actualValue = processTransaction({ action: '--name' }, path);
    let expectedValue = 'Invalid cammand';
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('Should return details for query cammand', () => {
    let actualValue = processTransaction(
      { action: '--query', '--empId': '11113' },
      'path',
      date,
      fs
    );
    let expectedValue = 'No record';
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('Should acknowledge that for updating records', () => {
    let details = {
      action: '--save',
      '--empId': '11113',
      '--beverage': 'Banana',
      '--qty': '1'
    };
    let actualValue = processTransaction(details, 'path', date.toJSON(), fs);

    let expectedValue =
      'Transaction Recorded:\n' +
      'Employee ID,Beverage,Quantity,Date\n' +
      '11113,Banana,1,' +
      date.toJSON();

    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

const assert = require('assert');
const lib = require('../src/beverageLib.js').lib;

describe('Test for beverageLib.js', () => {
  it('it Should manipulate the --save transaction', () => {
    let transaction =
      'node,filename,--save,--beverage,Orange,--empID,1111,--qty,1';
    let actualValue = lib.createTransaction(transaction.split(','));
    let expectedValue = {
      action: '--save',
      beverage: 'Orange',
      empID: '1111',
      qty: '1',
      date: new Date().toJSON()
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('it Should manipulate the --query transaction', () => {
    let transaction = 'node,filename,--query,--empID,1111';
    let actualValue = lib.createTransaction(transaction.split(','));
    let expectedValue = {
      action: '--query',
      empID: '1111'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('it Should update the records', () => {
    let transaction = {
      action: '--save',
      empID: '11111',
      beverage: 'Orange',
      qty: '1',
      date: new Date().toJSON()
    };
    let path = './juiceRecord/testForWrite.json';
    let date = new Date();
    let actualValue = lib.performTransaction(transaction, path);
    let expectedValue =
      'Transaction Recorded:\n' +
      'Employee ID,Beverage,Quantity,Date\n' +
      '11111,Orange,1,' +
      date.toJSON();
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

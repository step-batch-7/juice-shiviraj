const assert = require('assert');
const lib = require('../src/beverageLib.js').lib;

describe('Test for beverageLib.js', () => {
  it('it Should manipulate the --save transaction', () => {
    let transaction =
      'node,filename,--save,--beverage,Orange,--empID,1111,--qty,1';
    let actualValue = lib.getTransactionDetails(transaction.split(','));
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
    let actualValue = lib.getTransactionDetails(transaction.split(','));
    let expectedValue = {
      action: '--query',
      empID: '1111'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('Should read the records of file', () => {
    let actualValue = lib.readRecords('./juiceRecord/onlyForTest.json');
    let expectedValue = {
      '11113': [
        { beverage: 'Banana', date: '2019-11-23T06:32:39.851Z', qty: '1' }
      ]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

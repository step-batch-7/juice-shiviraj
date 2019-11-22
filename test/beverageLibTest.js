const assert = require('assert');
const lib = require('../src/beverageLib.js').lib;

describe('Test for beverageLib.js', () => {
  it('it Should manage the --save transaction', () => {
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

  it('it Should manage the --query transaction', () => {
    let transaction = 'node,filename,--query,--empID,1111';
    let actualValue = lib.createTransaction(transaction.split(','));
    let expectedValue = {
      action: '--query',
      empID: '1111'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

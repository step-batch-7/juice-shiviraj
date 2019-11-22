const assert = require('assert');
const lib = require('../src/beverageLib.js').lib;

describe('function under test', () => {
  it('it Should update the records', () => {
    let transaction = {
      action: '--save',
      empID: '11111',
      beverage: 'Orange',
      qty: '1',
      date: new Date().toJSON()
    };
    let actualValue = lib.performTransaction(transaction);
    let date = new Date();
    let expectedValue =
      'Transaction Recorded:\n' +
      'Employee ID,Beverage,Quantity,Date\n' +
      '11111,Orange,1,' +
      date.toJSON();
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

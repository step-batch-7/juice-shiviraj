const assert = require('assert');
const readRecords = require('../src/updateRecords.js').readRecords;
const updateTransaction = require('../src/updateRecords.js').updateTransaction;

describe('Should check update records', () => {
  it('it Should update the records', () => {
    let transaction = {
      action: '--save',
      empID: '11111',
      beverage: 'Orange',
      qty: '1',
      date: new Date().toJSON()
    };
    let date = new Date();
    let path = './juiceRecord/testForWrite.json';
    let actualValue = updateTransaction(transaction, path);
    let expectedValue =
      'Transaction Recorded:\n' +
      'Employee ID,Beverage,Quantity,Date\n' +
      '11111,Orange,1,' +
      date.toJSON();
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

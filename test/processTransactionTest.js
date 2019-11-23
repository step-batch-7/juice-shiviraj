const assert = require('assert');
const path = './juiceRecord/onlyForTest.json';
const processTransaction = require('../src/processTransaction.js')
  .processTransaction;

describe('Check processTransaction', () => {
  it('Should return cammand not implemented for invalid cammand', () => {
    let actualValue = processTransaction({ action: '--name' }, path);
    let expectedValue = 'Cammand not implemented';
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('Should return details for query cammand', () => {
    let actualValue = processTransaction(
      { action: '--query', empID: '11113' },
      path
    );
    let expectedValue =
      'Employee ID, Beverage, Quantity, Date\n' +
      '11113,Banana,1,2019-11-23T06:32:39.851Z\n' +
      'Total: 1 Juice';
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('Should acknowledge that for updating records', () => {
    let details = {
      action: '--save',
      empID: '11113',
      beverage: 'Banana',
      qty: '1',
      date: new Date().toJSON()
    };

    let date = new Date();
    let path = './juiceRecord/testForWrite.json';
    let actualValue = processTransaction(details, path);

    let expectedValue =
      'Transaction Recorded:\n' +
      'Employee ID,Beverage,Quantity,Date\n' +
      '11113,Banana,1,' +
      date.toJSON();

    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

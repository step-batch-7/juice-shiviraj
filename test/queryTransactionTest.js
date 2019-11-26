const assert = require('assert');
const getDetails = require('../src/queryTransaction.js').getDetails;
const formatMessage = require('../src/queryTransaction.js').formatMessage;

describe('Should check the query details', () => {
  it('Should return the query details ', () => {
    let details = [
      {
        '--beverage': 'Banana',
        '--qty': '1',
        '--date': '2019-11-23T06:32:39.851Z'
      }
    ];
    let actualValue = formatMessage(details, { '--empId': '11113' });
    let expectedValue = [
      'Employee ID, Beverage, Quantity, Date',
      '11113,Banana,1,2019-11-23T06:32:39.851Z',
      'Total: 1 Juices'
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('Should return the query details ', () => {
    let path = './juiceRecord/onlyForTest.json';
    let actualValue = getDetails({ '--empId': '11113' }, path);
    let expectedValue =
      'Employee ID, Beverage, Quantity, Date\n' +
      '11113,Banana,1,2019-11-23T06:32:39.851Z\n' +
      'Total: 1 Juices';
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('Should check for No records', () => {
    let path = './juiceRecord/onlyForTest.json';
    let actualValue = getDetails({ empID: '11111' }, path);
    let expectedValue = 'No record';
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

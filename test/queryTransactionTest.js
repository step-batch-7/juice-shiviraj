const assert = require('assert');
const { getDetails } = require('../src/queryTransaction.js');

const fs = {
  readFileSync: function(file) {
    assert.equal(file, 'path');
    return '{}';
  },
  writeFileSync: function(file) {
    assert.equal(file, 'path');
  },
  existsSync: function(file) {
    assert.equal(file, 'path');
    return false;
  }
};

describe('Should check the query details', () => {
  it('Should return the query details ', () => {
    let actualValue = getDetails({ '--empId': '11113' }, 'path', fs);
    let expectedValue =
      'Employee ID, Beverage, Quantity, Date\nTotal: 0 Juices';
    assert.deepStrictEqual(actualValue, expectedValue);
  });

  it('Should check for No records', () => {
    const fs = {
      readFileSync: function(file) {
        assert.equal(file, 'path');
        return '{"11113":[{"--empId":"11113","--beverage":"Orange","--qty":"3","--date":"2019-11-26T13:57:05.055Z"}]}';
      },
      existsSync: function(file) {
        assert.equal(file, 'path');
        return true;
      }
    };
    let actualValue = getDetails({ '--empId': '11113' }, 'path', fs);
    let expectedValue =
      'Employee ID, Beverage, Quantity, Date\n' +
      '11113,Orange,3,2019-11-26T13:57:05.055Z\n' +
      'Total: 3 Juices';
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

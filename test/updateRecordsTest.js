const assert = require('assert');
const readRecords = require('../src/updateRecords.js').readRecords;
const updateRecords = require('../src/updateRecords.js').updateRecords;
//const readRecords = require('../src/updateRecords.js').readRecords;

describe('function under test', () => {
  it('Should read the records of file', () => {
    let actualValue = readRecords('./juiceRecord/onlyForTest.json');
    assert.deepStrictEqual(actualValue, {});
  });
});

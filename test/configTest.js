const assert = require('assert');
const { getDataStorePath, getDate } = require('../src/config');

describe('getDataStorePath', function() {
  it('should pick the path from the env variable', () => {
    const env = { JUICE_TRANSACTIONS_STORE_PATH: 'data.json' };
    assert.strictEqual(getDataStorePath(env), 'data.json');
  });
  it('should give default path when not configured', () => {
    const env = {};
    assert.strictEqual(
      getDataStorePath(env),
      './juiceRecord/juiceRecords.json'
    );
  });
});
describe('getDate', function() {
  it('should give current time by default', function() {
    assert.deepStrictEqual(getDate({}), new Date());
  });
  it('should give stubbed time from env variable', function() {
    const stubbedDate = new Date('2019-01-01');
    const env = { NOW: stubbedDate.toJSON() };
    assert.deepStrictEqual(getDate(env), stubbedDate);
  });
});

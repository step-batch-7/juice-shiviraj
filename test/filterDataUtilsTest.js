const assert = require('assert');
const filterData = require('../src/filterDataUtils.js').filterData;
const data = {
  '11114': [
    {
      '--empId': '11114',
      '--beverage': 'Banana',
      '--qty': '3',
      '--date': '2019-11-27T05:18:28.801Z'
    },
    {
      '--empId': '11114',
      '--beverage': 'Mango',
      '--qty': '2',
      '--date': '2019-11-30T05:18:28.801Z'
    }
  ]
};

const expected1 = [
  {
    '--empId': '11114',
    '--beverage': 'Banana',
    '--qty': '3',
    '--date': '2019-11-27T05:18:28.801Z'
  }
];
const expected2 = [
  {
    '--empId': '11114',
    '--beverage': 'Mango',
    '--qty': '2',
    '--date': '2019-11-30T05:18:28.801Z'
  }
];

describe('filter data utils test', () => {
  it('should filter data for no record ', () => {
    let actual = filterData(data, { '--empId': '11' });
    assert.deepStrictEqual(actual, undefined);
  });

  it('should filter data according to date ', () => {
    let actual = filterData(data, { '--date': '2019-11-30' });
    assert.deepStrictEqual(actual, expected2);
  });

  it('should filter data according to beverage ', () => {
    let actual = filterData(data, { '--beverage': 'Banana' });
    assert.deepStrictEqual(actual, expected1);
  });

  it('should filter data according to empId ', () => {
    let actual = filterData(data, { '--empId': '11114' });
    assert.deepStrictEqual(actual, expected1.concat(expected2));
  });

  it('should filter data according to beverage and empId ', () => {
    let actual = filterData(data, {
      '--empId': '11114',
      '--beverage': 'Banana'
    });
    assert.deepStrictEqual(actual, expected1);
  });

  it('should filter data according to beverage and date ', () => {
    let actual = filterData(data, {
      '--empId': '11114',
      '--date': '2019-11-27'
    });
    assert.deepStrictEqual(actual, expected1);
  });

  it('should filter data according to beverage and qty if invalid', () => {
    let actual = filterData(data, {
      '--qty': '2',
      '--beverage': 'Banana'
    });
    assert.deepStrictEqual(actual, []);
  });

  it('should filter data according to beverage and qty if valid ', () => {
    let actual = filterData(data, {
      '--qty': '3',
      '--beverage': 'Banana'
    });
    assert.deepStrictEqual(actual, expected1);
  });
});

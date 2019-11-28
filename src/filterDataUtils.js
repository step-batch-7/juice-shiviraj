const isIncludes = function(keys, key) {
  return keys.includes(key);
};

const concatData = function(wholeData) {
  return function(concated, data) {
    return concated.concat(wholeData[data]);
  };
};

const filter = function(data, filterBy, key) {
  const option = filterBy[key];
  data = data.filter(function(datum) {
    const length = option.length;
    return datum[key].slice(0, length) == option;
  });
  return data;
};

const filterByOption = function(data, option) {
  for (const key in option) {
    const keys = 'action,--empId'.split(',');
    if (!isIncludes(keys, key)) {
      data = filter(data, option, key);
    }
  }
  return data;
};

const filterData = function(records, details) {
  const keys = Object.keys(records);
  let filteredData = keys.reduce(concatData(records), []);
  if (details.hasOwnProperty('--empId')) {
    filteredData = records[details['--empId']];
  }
  if (filteredData != undefined) {
    return filterByOption(filteredData, details);
  }
  return filteredData;
};

exports.filterData = filterData;

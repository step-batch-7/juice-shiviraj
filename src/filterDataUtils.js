const removeKeys = function(object) {
  delete object.action;
  delete object['--empId'];
  return object;
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
  const keys = Object.keys(option);
  for (let idx = 0; idx < keys.length; idx++) {
    data = filter(data, option, keys[idx]);
  }
  return data;
};

const filterData = function(records, details) {
  const keys = Object.keys(records);
  let filteredData = keys.reduce(concatData(records), []);
  if (details['--empId'] != undefined) {
    filteredData = records[details['--empId']];
  }
  if (filteredData != undefined) {
    details = removeKeys(details);
    return filterByOption(filteredData, details);
  }
  return filteredData;
};

exports.filterData = filterData;

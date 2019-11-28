const loadRecords = require('./updateRecords').loadRecords;
const filterData = require('./filterDataUtils').filterData;

const updateMessage = function(details) {
  const empId = details['--empId'];
  return function(response, content) {
    let totalJuice = response.pop();
    totalJuice = +content['--qty'] + totalJuice;
    const messageRow = [
      content['--empId'],
      content['--beverage'],
      content['--qty'],
      content['--date']
    ];
    response.push(messageRow.join(','), totalJuice);
    return response;
  };
};

const formatMessage = function(fetchDetails, details) {
  let response = ['Employee ID, Beverage, Quantity, Date', 0];
  response = fetchDetails.reduce(updateMessage(details), response);
  response.push(`Total: ${response.pop()} Juices`);
  return response;
};

const getDetails = function(details, recordFile, fs) {
  const records = loadRecords(recordFile, fs);
  const fetchDetails = filterData(records, details);
  let formattedMessage = ['No record'];
  if (fetchDetails != undefined) {
    formattedMessage = formatMessage(fetchDetails, details);
  }
  return formattedMessage.join('\n');
};

exports.getDetails = getDetails;

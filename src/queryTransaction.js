const { loadRecords } = require('./updateRecords');
const { filterData } = require('./filterDataUtils');

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
  let response = [0];
  response = fetchDetails.reduce(updateMessage(details), response);
  response.push(`Total: ${response.pop()} Juices`);
  return response;
};

const getDetails = function(details, recordFile, fs) {
  const records = loadRecords(recordFile, fs);
  const fetchDetails = filterData(records, details);
  const message = ['Employee ID, Beverage, Quantity, Date'];
  let formattedMessage = ['Total: 0 Juices'];
  if (fetchDetails != undefined) {
    formattedMessage.pop();
    formattedMessage = formatMessage(fetchDetails, details);
  }
  message.push(...formattedMessage);
  return message.join('\n');
};

exports.getDetails = getDetails;

const readRecords = require('./updateRecords').readRecords;

const updateMessage = function(details) {
  const empID = details.empID;
  return function(response, content) {
    let totalJuice = response.pop();
    totalJuice = +content.qty + totalJuice;
    const messageRow = [empID, content.beverage, content.qty, content.date];
    response.push(messageRow.join(','), totalJuice);
    return response;
  };
};

const formatMessage = function(fetchDetails, details) {
  let response = ['Employee ID, Beverage, Quantity, Date', 0];
  response = fetchDetails.reduce(updateMessage(details), response);
  response.push('Total: ' + response.pop() + ' Juice');
  return response;
};

const getDetails = function(details, recordFile) {
  const records = readRecords(recordFile);
  const fetchDetails = records[details.empID];
  let formattedMessage = ['No record'];
  if (fetchDetails != undefined) {
    formattedMessage = formatMessage(fetchDetails, details);
  }
  return formattedMessage.join('\n');
};

exports.formatMessage = formatMessage;
exports.getDetails = getDetails;

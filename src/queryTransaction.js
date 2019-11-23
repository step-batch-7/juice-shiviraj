const readRecords = require('./beverageLib').lib.readRecords;

const updateMessage = function(details) {
  let empID = details.empID;
  return function(message, content) {
    let total = message.pop();
    total = total + +content.qty;
    let messageRow =
      empID + ',' + content.beverage + ',' + content.qty + ',' + content.date;
    message.push(messageRow, total);
    return message;
  };
};

const formatMessage = function(queryDetails, details) {
  let message = ['Employee ID, Beverage, Quantity, Date', 0];
  message = queryDetails.reduce(updateMessage(details), message);
  message.push('Total: ' + message.pop() + ' Juice');
  return message;
};

const getDetails = function(details, path) {
  let records = readRecords(path);
  let queryDetails = records[details.empID];
  let formattedMessage = ['No record'];
  if (queryDetails != undefined) {
    formattedMessage = formatMessage(queryDetails, details);
  }
  return formattedMessage.join('\n');
};

exports.formatMessage = formatMessage;
exports.getDetails = getDetails;

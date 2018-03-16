/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
  var hr=Number(hours);
  var mn=Number(minutes);
  return (hr>=0 && hr<=23 && mn>=0 && mn<=59)
};

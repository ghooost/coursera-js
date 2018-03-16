/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
  function formNum(num){
    return num<10?'0'+num.toString():num.toString()
  }
  var newMin=minutes+interval;
  var retHr=(hours+parseInt(Math.floor(newMin/60)))%24;
  var retMin=newMin%60;
  return formNum(retHr)+':'+formNum(retMin);
};

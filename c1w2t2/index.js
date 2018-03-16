/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
  return hashtags
  .reduce(function(acc,item){
      var lItem=item.toLowerCase();
      if(acc.indexOf(lItem)===-1){
        acc.push(lItem)
      }
      return acc;
  },[])
  .join(', ');
};

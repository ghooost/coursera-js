/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
  return tweet.split('#')
          .map(function(item,index){
            if(index===0 || item.trim().length===0){
              return '';
            } else {
              return item.trim().split(' ')[0]
            }
          })
          .filter(function(item,index){
            return item!='';
          })
};

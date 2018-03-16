// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
  var arr=command.split(' ');
  switch(arr[0]){
    case 'ADD':
      if(!phoneBook.hasOwnProperty(arr[1])){
        phoneBook[arr[1]]=[];
      }
      phoneBook[arr[1]]=phoneBook[arr[1]].concat(arr[2].split(','));
    break;
    case 'REMOVE_PHONE':
      var found=false;
      for(var name in phoneBook){
        phoneBook[name]=phoneBook[name]
          .filter(function(item){
            if(item===arr[1]){
              found=true;
              return false;
            } else {
              return true;
            }
          })
      };
      return found;
    break;
    case 'SHOW':
      var ret=[];
      for(var name in phoneBook){
        if(phoneBook[name].length>0){
          ret.push(name+': '+phoneBook[name].join(', '))
        }
      };
      return ret.sort();
    break;
  }
};

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
  var filters={};
  var fields=collection.reduce(function(acc,item){
    for(var o in item)
      acc[o]=true;
    return acc;
  },{});
  [].slice.call(arguments)
  .slice(1)
  .forEach(function(item){
    switch(item.action){
      case 'select':
        for(var field in fields){
          if(item.fields.indexOf(field)===-1){
            fields[field]=false;
          }
        }
      break;
      case 'filter':
        if(filters.hasOwnProperty(item.field)){
          filters[item.field]=filters[item.field].filter(function(value){
            return (item.values.indexOf(value)!==-1)?true:false;
          });
        } else {
          filters[item.field]=item.values;
        }
      break;
    }
  })
  return collection.filter(function(item){
      for(var field in item){
        if(filters.hasOwnProperty(field) && filters[field].indexOf(item[field])===-1){
          return false;
        }
      }
      return true;
  }).map(function(item){
    return Object.keys(fields).reduce(function(acc,field){
      if(fields[field]===true && item.hasOwnProperty(field)){
        acc[field]=item[field];
      }
      return acc;
    },{})
  })
}

/**
 * @params {String[]}
 */
function select() {
  return {
    action:'select',
    fields:[].slice.call(arguments)
  }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
  return {
    action:'filter',
    field:property,
    values:values
  }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};

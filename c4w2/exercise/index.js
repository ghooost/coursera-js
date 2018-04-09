module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
  this.data=[];
}

// Методы коллекции
Collection.prototype.values = function () {
  return this.data;
};
Collection.prototype.count = function () {
  return this.data.length;
};
Collection.prototype.at = function (pos) {
  if(pos<1 || pos>this.data.length){
    return null;
  } else {
    return this.data[pos-1];
  };
};
Collection.prototype.append = function (obj) {
  if(obj instanceof Collection){
    this.data=this.data.concat(obj.values());
  } else {
    this.data.push(obj);
  }
};
Collection.prototype.removeAt = function (pos) {
  if(pos<1 || pos>this.data.length){
    return false;
  } else {
    this.data.splice(pos-1, 1);
    return true;
  };
};

// другие методы


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (values) {
  return Object.create(Collection.prototype,
    {
      data:{
        writable: true,
        configurable: true,
        value:values
      }
    }
  );
};

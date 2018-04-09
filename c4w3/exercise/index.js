/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
  var arr=operations.map(function(func){
      return new Promise(function(resolve,reject){
        func(function(err,data){
          if(err){
            reject(err);
          } else {
            resolve(data);
          };
        });
      });
  });

  return Promise.all(arr)
    .then(function(data){
      callback(null,data);
    })
    .catch(function(err){
      callback(err);
    })
};

var subscriptions={}
module.exports = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
      if(!subscriptions.hasOwnProperty(event)){
        subscriptions[event]=[];
      }
      if(!subscriptions[event].some(function(item){
        return (item.subscriber==subscriber && item.handler==handler);
      })){
        subscriptions[event].push({
          subscriber:subscriber,
          handler:handler
        })
      }
      return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
      if(subscriptions.hasOwnProperty(event)){
        subscriptions[event]=subscriptions[event].filter(function(item){
          return (item.subscriber!=subscriber);
        })
      }
      return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
      if(subscriptions.hasOwnProperty(event)){
        subscriptions[event].forEach(function(item){
          item.handler.call(item.subscriber)
        })
      }
      return this;
    }
};

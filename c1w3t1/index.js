/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
  var ret={
    _value:null
  };
  Object.defineProperties(ret, {
    'value':{
      get:function(){
        var y=this._value.getFullYear();
        var m=this._value.getMonth();
        var d=this._value.getDate();
        var h=this._value.getHours();
        var i=this._value.getMinutes();
        return y+'-'+this.formNum(m+1)+'-'+this.formNum(d)+' '+this.formNum(h)+':'+this.formNum(i)
      },
      set:function(date){
        if(date.match(/(\d+)\-0*(\d+)\-0*(\d+)\s0*(\d+)\:0*(\d+)/)){
          this._value=new Date(RegExp.$1,RegExp.$2-1,RegExp.$3,RegExp.$4,RegExp.$5);
        }
      }
    },
    'change':{
      value:function(sign,val,mode){
        var n=Number(val);
        if(n==NaN || n<0){
          throw new TypeError('wrong number param');
        };
        n*=sign;
        switch(mode){
          case 'years':
            this._value.setFullYear(this._value.getFullYear()+n);
          break;
          case 'months':
            this._value.setMonth(this._value.getMonth()+n);
          break;
          case 'days':
            this._value.setDate(this._value.getDate()+n);
          break;
          case 'hours':
            this._value.setHours(this._value.getHours()+n);
          break;
          case 'minutes':
            this._value.setMinutes(this._value.getMinutes()+n);
          break;
          default:
            throw new TypeError('wrong command')
        }
        return this;
      }
    },
    'add':{
      value:function(val,mode){
        return this.change(1,val,mode);
      }
    },
    'subtract':{
      value:function(val,mode){
        return this.change(-1,val,mode);
      }
    },
    'formNum':{
      value:function(val){
        return (val<10)?'0'+val:val.toString();
      }
    }
  });
  ret.value=date;
  return ret;
};

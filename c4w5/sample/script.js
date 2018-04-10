'use strict';

// Код валидации формы
function validateForm(options){
  var forms=document.body.querySelectorAll("form#"+options.formId);
  if(forms.length){
    for(var cnt=0,m=forms.length;cnt<m;cnt++){
      new validatorClass(forms[cnt],options);
    };
  } else {
    throw "There is no form with id="+options.formId;
  }

  function validatorClass(form,options){

    this.formValidClass=options.formValidClass;
    this.formInvalidClass=options.formInvalidClass;
    this.inputErrorClass=options.inputErrorClass;

    form.addEventListener("submit", this, true);
    form.addEventListener("blur", this, true);
    form.addEventListener("focus", this, true);
  }

  validatorClass.prototype.handleEvent=function(e){
    switch(e.type){
      case "focus":
        if (e.target.tagName === 'INPUT') {
          this.clearInputError(e.target);
        };
      break;
      case "blur":
        if (e.target.tagName === 'INPUT') {
          this.validateInput(e.target);
        };
      break;
      case "submit":
        if (e.target.tagName === 'FORM') {
          e.preventDefault();
          this.validateForm(e.target);
        };
      break;
    }
  }

  validatorClass.prototype.clearInputError=function(ele){
    ele.classList.remove(this.inputErrorClass);
  }

  validatorClass.prototype.validateInput=function(ele){
    var isError=0;
    if(!ele.value){
      if(ele.dataset.required!==undefined){
        isError=1;
      };
    } else if(ele.dataset.validator){
      switch(ele.dataset.validator){
        case "letters":
          isError=this.validateLetters(ele);
        break;
        case "number":
          isError=this.validateNumber(ele);
        break;
        case "regexp":
          isError=this.validateRegexp(ele);
        break;
        default:
          throw "There is no required validator "+ele.dataset.validator;
      };
    }
    if(isError){
      ele.classList.add(this.inputErrorClass);
    };
    return isError;
  }

  validatorClass.prototype.validateLetters=function(ele){
    return (ele.value.match(/[^A-Za-zА-Яа-яЁё]/i)!=null);
  }

  validatorClass.prototype.validateNumber=function(ele){
    var n=Number(ele.value);
    if(n !== n ){
      return 1;
    } else {
      var min=ele.dataset.validatorMin==undefined?NaN:Number(ele.dataset.validatorMin);
      var max=ele.dataset.validatorMax==undefined?NaN:Number(ele.dataset.validatorMax);
      if(min===min && n<min){
        return 1;
      };
      if(max===max && n>max){
        return 1;
      };
    };
    return 0;
  }

  validatorClass.prototype.validateRegexp=function(ele){
    if(ele.dataset.validatorPattern!=undefined && ele.value.match(ele.dataset.validatorPattern)==null){
        return 1;
    };
    return 0;
  }

  validatorClass.prototype.validateForm=function(ele){
    var errorsFound=0;
    ele.classList.remove(this.formValidClass);
    ele.classList.remove(this.formInvalidClass);
    for(var cnt=0,m=ele.elements.length;cnt<m;cnt++){
      errorsFound+=this.validateInput(ele.elements[cnt]);
    };
    if(errorsFound>0){
      ele.classList.add(this.formInvalidClass);
    } else {
      ele.classList.add(this.formValidClass);
    };
  }

}

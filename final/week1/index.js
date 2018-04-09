(function(){
  var reverseClass="reversed";
  var normalClass="normal";
  window.addEventListener("load", function(){
    var cards=document.querySelectorAll(".board_items li");
    for(var cnt=0,m=cards.length;cnt<m;cnt++){
      cards[cnt].addEventListener("click",cardClickCatcher,false);
    }
  }, true);

  function rotateFaceUp(oCard){
      oCard.classList.remove(normalClass);
      oCard.classList.add(reverseClass);
  }

  function rotateFaceDown(oCard){
      oCard.classList.remove(reverseClass);
      oCard.classList.add(normalClass);
  }

  function isFaceUp(oCard){
    return oCard.classList.contains(reverseClass);
  }

  function cardClickCatcher(){
    if(isFaceUp(this)){
      rotateFaceDown(this);
    } else {
      var cards=document.querySelectorAll(".board_items li."+reverseClass);
      for(var cnt=0,m=cards.length;cnt<m;cnt++){
        rotateFaceDown(cards[cnt]);
      };
      rotateFaceUp(this);
    };
  }
}());

(function(){
  window.addEventListener("load", function(){
    var games=document.querySelectorAll(".board");
    for(var cnt=0,m=games.length;cnt<m;cnt++){
      new Memoji(games[cnt]);
    }
  },false);

  function Memoji(oBoard){
    this.oBoard=oBoard;
    this.cards=[];
    addEventListener("click", this.onClick, true);
    var raw=["🐶","🐹","🐱","🐰","🐻","🐭"];
    var emos=raw.concat(raw);
    var cards=oBoard.querySelectorAll("li");
    for(var cnt=0,m=cards.length;cnt<m;cnt++){
      this.cards.push(new Card(cards[cnt],
        emos.splice(Math.floor(Math.random()*10000)%emos.length, 1)));
    };
  }

  Memoji.prototype.onClick=function(e){
    e.stopPropagation();
    e.preventDefault();
  }

  function Card(obj, emo){
    this.opened=false;
    this.ele=
  }

  var reverseClass="reversed";
  window.addEventListener("load", function(){
    var raw=["🐶","🐹","🐱","🐰","🐻","🐭"];
    var emos=raw.concat(raw);
    var cards=document.querySelectorAll(".board_items li");
    for(var cnt=0,m=cards.length;cnt<m;cnt++){
      cards[cnt].addEventListener("click",cardClickCatcher,false);
      cards[cnt].dataset.emo=emos.splice(Math.floor(Math.random()*10000)%emos.length, 1);
    }
  }, true);

  function rotateFaceUp(oCard){
      oCard.classList.add(reverseClass);
  }

  function rotateFaceDown(oCard){
      oCard.classList.remove(reverseClass);
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

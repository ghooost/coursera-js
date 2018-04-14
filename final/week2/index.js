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
    addEventListener("click", this.onClick.bind(this), true);
    var raw=["🐶","🐹","🐱","🐰","🐻","🐭"];
    var emos=raw.concat(raw);
    var cards=oBoard.querySelectorAll("li");
    for(var cnt=0,m=cards.length;cnt<m;cnt++){
      this.cards.push(new Card(cards[cnt],
        emos.splice(Math.floor(Math.random()*10000)%emos.length, 1)[0]));
    };
  }

  Memoji.prototype.onClick=function(e){
    e.stopPropagation();
    e.preventDefault();
    if(e.target.tagName=='LI'){
      var card=this.cards.filter(ele=>ele.isEleOwner(e.target));
      if(card.length){
        if(card[0].isModeEq(Card.modes.closed)){
          var cardToOpen=card[0];
          //if there is single card
          var openedCards=this.cards.filter(ele=>ele.isModeEq(Card.modes.single));
          if(openedCards.length){
              //there is a card to compare with
              var cardToCompare=openedCards[0];
              if(cardToOpen.isSameEmo(cardToCompare)){
                cardToOpen.setMode(Card.modes.success);
                cardToCompare.setMode(Card.modes.success);
              } else {
                cardToOpen.setMode(Card.modes.error);
                cardToCompare.setMode(Card.modes.error);
              };
          } else {
              //there is no cards to compare with
              cardToOpen.setMode(Card.modes.single);
              var errorCards=this.cards.filter(ele=>ele.isModeEq(Card.modes.error));
              for(var cnt=0,m=errorCards.length;cnt<m;cnt++){
                errorCards[cnt].close();
                errorCards[cnt].setMode(Card.modes.closed);
              };
          }
          cardToOpen.open();
        }
      }
    }
  }

  function Card(obj, emo){
    this.mode='';
    this.ele=obj;
    this.emo=emo;
    this.ele.dataset.emo=emo;
  }
  Object.defineProperty(Card, 'modes', {
    value: {closed:'',single:'single',success:'success',error:'error'},
    writable: false
  });
  Card.prototype.setMode=function(mode){
    this.mode=mode;
    this.ele.dataset.mode=this.mode;
  }
  Card.prototype.open=function(){
    this.ele.classList.add('reversed')
  }
  Card.prototype.close=function(){
    this.ele.classList.remove('reversed')
  }
  Card.prototype.isSameEmo=function(oCard){
    return this.emo==oCard.emo;
  }
  Card.prototype.isEleOwner=function(ele){
    return this.ele==ele;
  }
  Card.prototype.isModeEq=function(mode){
    return this.mode==mode;
  }
}());

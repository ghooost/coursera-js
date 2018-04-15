(function(){

  //NOTE: class for game
  function Memoji(oBoard){
    this.ele=oBoard;
    this.cards=[];
    this.mode='';
    this.timer=new Timer(
      this.ele.querySelector('.memoji_timer'),
      60,
      this.lost.bind(this)
    );
    this.popup=new Popup(
      this.ele.querySelector('.memoji_popup'),
      this.restart.bind(this)
    );
    var cards=this.ele.querySelectorAll("li");
    for(var cnt=0,m=cards.length;cnt<m;cnt++){
      this.cards.push(new Card(cards[cnt]));
    };
    this.ele.querySelector('.memoji_board').addEventListener(
      "click",
      this.onClick.bind(this),
      true
    );
  }

  Object.defineProperty(Memoji, 'mode', {
    value: {
      prestart:'',
      started:'started',
      inprogress:'inprogress',
      stopped:'stopped'
    },
    writable: false
  });

  //restart game - close opened cards, clear modes
  Memoji.prototype.restart=function(){
    this.mode=Memoji.mode.prestart;
    var waitForStart=10;
    for(var cnt=0,m=this.cards.length;cnt<m;cnt++){
      if(!this.cards[cnt].isModeEq(Card.mode.closed)){
        this.cards[cnt].close();
        this.cards[cnt].setMode(Card.mode.closed);
        waitForStart=500;
      }
    };
    this.timer.reset();
    setTimeout(this.start.bind(this),waitForStart);
  }

  //start game - assign emos
  Memoji.prototype.start=function(){
    var raw=["🐶","🐹","🐱","🐰","🐻","🐭"];
    var emos=raw.concat(raw);
    for(var cnt=0,m=this.cards.length;cnt<m;cnt++){
      this.cards[cnt].setEmo(
        emos.splice(Math.floor(Math.random()*10000)%emos.length, 1)[0]
      );
    };
    this.mode=Memoji.mode.started;
  }

  Memoji.prototype.won=function(){
    this.timer.stop();
    this.mode=Memoji.mode.stopped;
    this.popup.show("Win","Play again");
  }

  Memoji.prototype.lost=function(){
    this.mode=Memoji.mode.stopped;
    this.popup.show("Lose","Try again");
  }

  Memoji.prototype.onClick=function(e){
    e.stopPropagation();
    e.preventDefault();
    if(e.target.tagName=='LI'){
      if(this.mode==Memoji.mode.started){
        //first click - start timer
        this.timer.start();
        this.mode=Memoji.mode.inprogress;
      } else if(this.mode!=Memoji.mode.inprogress){
        //the game isn't in play mode
        return;
      };
      var cardToOpen=this.cards.find(ele=>ele.isEleOwner(e.target));
      if(cardToOpen && cardToOpen.isModeEq(Card.mode.closed)){
        var cardToCompare=this.cards.find(
          ele=>ele.isModeEq(Card.mode.single)
        );
        if(cardToCompare){
            //there is a card to compare with
            if(cardToOpen.isSameEmo(cardToCompare)){
              //same emo cards
              cardToOpen.setMode(Card.mode.success);
              cardToCompare.setMode(Card.mode.success);

              var closedCards=this.cards.filter(
                ele=>ele.isModeEq(Card.mode.closed)
              );
              if(closedCards.length==0){
                //you've won, end of game
                this.won();
              };
            } else {
              //different emo cards
              cardToOpen.setMode(Card.mode.error);
              cardToCompare.setMode(Card.mode.error);
            };
        } else {
            //there is no cards to compare with
            cardToOpen.setMode(Card.mode.single);
            var errorCards=this.cards.filter(
              ele=>ele.isModeEq(Card.mode.error)
            );
            for(var cnt=0,m=errorCards.length;cnt<m;cnt++){
              //close error cards
              errorCards[cnt].close();
              errorCards[cnt].setMode(Card.mode.closed);
            };
        }
        cardToOpen.open();
      }
    }
  }

  //NOTE: class for card
  function Card(oCard){
    this.mode='';
    this.emo='';
    this.ele=oCard;
  }
  Object.defineProperty(Card, 'mode', {
    value: {
      closed:'',
      single:'single',
      success:'success',
      error:'error'
    },
    writable: false
  });
  Card.prototype.setEmo=function(emo){
    this.emo=emo;
    this.ele.dataset.emo=emo;
  }
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


  //NOTE: class for Timer
  function Timer(oTimer,timeLimit,onLimitReached){
    this.ele=oTimer;
    this.value=0;
    this.timerid=0;
    this.timeLimit=timeLimit;
    this.onLimitReached=onLimitReached;
  }
  Timer.prototype.reset=function(){
    this.value=0;
    this.render();
  }
  Timer.prototype.start=function(){
    this.value=this.timeLimit;
    this.timerid=setInterval(this.onTimer.bind(this),1000);
    this.render();
  }
  Timer.prototype.stop=function(){
    clearInterval(this.timerid);
    this.timerid=0;
    this.render();
  }
  Timer.prototype.onTimer=function(){
    this.value--;
    if(this.value<=0){
      this.value=0;
      this.stop();
      this.onLimitReached();
    } else {
      this.render();
    };
  }
  Timer.prototype.render=function(){
    this.ele.innerHTML=this.formatNumber(Math.floor(this.value/60))+":"+this.formatNumber(this.value%60);
  }
  Timer.prototype.formatNumber=function(val){
    return (Math.abs(val)<10?'0':'')+val.toString();
  }

  //NOTE: class for popup message
  function Popup(oPopup,onButton){
    this.ele=oPopup;
    this.onButton=onButton;
    this.ele.querySelector(".memoji_popup_button").addEventListener(
      "click",
      this.onClick.bind(this),
      true
    );
  }
  Popup.prototype.show=function(message,buttonMessage){
    var messageHTML='<span>'+message.split('').join('</span><span>')+'</span>';
    this.ele.querySelector(".memoji_popup_message").innerHTML=messageHTML;
    this.ele.querySelector(".memoji_popup_button").innerHTML=buttonMessage;
    this.ele.classList.add("show");
  }
  Popup.prototype.close=function(){
    this.ele.classList.remove("show");
    this.ele.querySelector(".memoji_popup_message").innerHTML="";
    this.onButton();
  }
  Popup.prototype.onClick=function(e){
    e.stopPropagation();
    this.close();
    this.onButton();
  }

  //NOTE: initial start on doc load
  window.addEventListener("load", function(){
    var games=document.querySelectorAll(".memoji");
    for(var cnt=0,m=games.length;cnt<m;cnt++){
      (new Memoji(games[cnt])).restart();
    }
  },false);

}());

class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

   play(){
     question.hide();
     background("yellow")

     textSize(30)
     fill("white")
     text("RESULT",350,30);
     
     Contestant.getPlayerInfo();

     
    //write code to add a note here
    if(allContestantInfo !==undefined){
      fill("blue")
      textSize(20);
      text("note: contestant who's answers are right will be highlighted in green",130,230)
      for(var cts in allContestantInfo){
        var answer="2"
        if(allContestantInfo[cts].answer===answer){
          fill("green")
        }
        else{
          fill("red")

        }
       yvalue=yvalue+30
        textSize(20)
        text(allContestantInfo[cts].name +" ;" + allContestantInfo[cts].answer,130,yvalue)
        text("texta",130,250)
      }
    }

    //write code to highlight contest who answered correctly
    
  }

}

class Game {
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
      player = new Player();
      var playerCountRef  = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(22);
    //textAlign(CENTER, CENTER);
    text("Game Start!", 250,100);
    Player.getInfo();
    if(players !== undefined){
      var displayPos = 150;
      for(var plr in players){
        if(plr == "player"+player.index){
          fill("blue");
        } else {
          fill("black");
        }
        displayPos+= 30;
        textSize(20);
        text(players[plr].name + "-" + players[plr].distance, 100,displayPos);
      }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 100;
      player.update();
    }
  }
}

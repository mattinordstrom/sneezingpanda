game.module(
    'game.enemyhandler'
)
.require(
    'game.enemy'
)
.body(function() {
    
  enemyhandler = game.Class.extend({
     init: function() {
       this.m_Enemy;
     },

     createEnemy: function() {

//TODO: Create pre-defined pool of enemies!

        this.m_Enemy = new enemy();
     } 

  });



});

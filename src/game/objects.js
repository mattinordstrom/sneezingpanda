game.module(
    'game.objects'
)
.body(function() {
    
  //////////////////
  // BGR CLASS
  AddSprite = game.Class.extend({
     init: function(x, y, id) {
       this.sprite = new game.Sprite(id);
       this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
       this.sprite.position.x = x;
       this.sprite.position.y = y;

		//this.sprite.rotation = 0.2;
		//this.sprite.alpha = 0.5;
		//this.sprite.scale.x = 0.8;
		//this.sprite.visible = false;


       game.scene.stage.addChild(this.sprite);

       //return this.sprite ??????
     }
  });

game.createClass('Player', {
    init: function() {
    }
});

});

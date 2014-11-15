game.module(
    'game.enemy'
)
.body(function() {
    
  enemy = game.Class.extend({
     init: function() {
       //alert('yo');

        this.sprite = new game.Sprite('enemy');
       this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
       this.sprite.scale.x = this.sprite.scale.y = 0.5;
       this.sprite.position.x = 280;
       this.sprite.position.y = -this.sprite.height/2;
      //this.sprite.width = 100;
      //this.sprite.height = 100;

       game.scene.stage.addChild(this.sprite);

       eTween = new game.Tween(this.sprite.position);
      eTween.to({y: 600}, CONST_SPEED);
      eTween.start();

     }
  });


});

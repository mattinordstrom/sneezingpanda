
////////////////////////////////////////////////////
//VALUES

//CONST_SPEED = 3000;
//CONST_MOVEMENT = 10;

//sprite positions...

////////////////////////////////////////////////////


game.module(
    'game.main'
)
.require(
    'game.assets',
    'game.objects',
    'game.enemyhandler'
)

.body(function() {

  game.createScene('Main', {
      backgroundColor: 0x000000,
      //update: function() {
        //if (game.accelerometer) {
          //this.pandaImg.sprite.position.x = game.accelerometer.y;
          //  this.pandaImg.sprite.position.x -= game.accelerometer.y * game.system.delta * 2;
            //this.pandaImg.sprite.position.y -= game.accelerometer.x * game.system.delta * 50;
        //}
    //},
    collide: function() {
        console.log('yo')
    },
    
    /*logicTicker: function() {
      console.log('logic');
      var self = this;
      if(lastLogicTime == undefined)
        //var lastLogicTime = 0;

        //var currTime = new Date().getTime();
        //var timeToCall = Math.max(0, 16 - (currTime - lastLogicTime));
        
        setTimeout(function() { self.logicTicker(); }, 50); //logic tick every 50 ms?
        
        //lastLogicTime = currTime + timeToCall;
        //return id;
    
    },*/
    init: function() {
      var that = this;

      //Initialize logic ticker
      //this.logicTicker();

      /* var applelogo = new game.Sprite('applelogo');
       applelogo.anchor.x = 0.5;
       applelogo.anchor.y = 0.5;
       applelogo.position.x = game.system.width / 2;
       applelogo.position.y = game.system.height / 2;
       this.stage.addChild(applelogo);
       
       var tween = new game.Tween(applelogo.scale);
       tween.to({x:1.1, y:1.1}, 1000);
       tween.repeat();
       tween.yoyo();
       tween.start();
       */
       

      var backgroundImg = new AddSprite(
        (game.system.width / 2),
        -(BGR_IMG_HEIGHT/2)+game.system.height,
        'bgr'
        );

      var groundImg = new AddSprite(
        (game.system.width / 2),
        game.system.height-(100/2),
        'ground'
        );

      var pandaImg = new AddSprite(
        (game.system.width / 2),
        540,
        'panda'
        );
      this.pandaImg = pandaImg;

/////////////COLLISION
/*this.world = new game.World(0, 0);

        var x = game.system.width / 2;
        var y = 300;
        this.body = new game.Body({
            position: { x: x, y: y },
            velocityLimit: { x: 0, y: 0 },
            collideAgainst: 0,
            collisionGroup: 1,
        });
        this.body.collide = this.collide.bind(this);
        //this.body.addShape(new game.Rectangle(132, 36));
        game.scene.world.addBody(this.body);*/
/////////////////////////////////

      var tween1 = new game.Tween(backgroundImg.sprite.position);
       tween1.to({y:(BGR_IMG_HEIGHT/2)}, CONST_SPEED);
       tween1.repeat();
       //tween.yoyo();
       

      var tween2 = new game.Tween(groundImg.sprite.position);
       tween2.to({y:game.system.height+(100/2)}, CONST_SPEED/3);
       //tween.repeat();
       //tween.yoyo();
       

      //pandaImg.sprite.anchor.x = pandaImg.sprite.anchor.y = 0.5;
      var pandaScaleTween = new game.Tween(pandaImg.sprite.scale);
      pandaScaleTween.to({x:1.2, y: 1.2}, 400);
      pandaScaleTween.yoyo();
      pandaScaleTween.repeat();
      pandaScaleTween.start();


      var emitter = new game.Emitter();
        emitter.container = this.stage;
        emitter.textures.push('starParticle');
        emitter.position.set(pandaImg.sprite.x, pandaImg.sprite.y+30);
        //emitter.positionVar.set(100, 100);
        emitter.speed = 15;
        emitter.speedVar = 17;
        emitter.rate = 0.5; // Emit particles every second
        emitter.count = 4; // Emit 2 particles
        this.addEmitter(emitter);

        var enemyHandler = new enemyhandler();

/////////////////////////////////////////////////////////////////////////////////////////
      pandaImg.sprite.interactive = true;
      pandaImg.sprite.mousedown = function(){
          pandaScaleTween.pause();
          pandaImg.sprite.scale.x = 1;
          pandaImg.sprite.scale.y = 1;

          var pandaTween = new game.Tween(pandaImg.sprite.position);
          pandaTween.to({y:game.system.height-200}, CONST_SPEED/3);
          pandaTween.start();

          tween1.start();
          tween2.start();

          pandaImg.sprite.touchstart = pandaImg.sprite.mousedown = null;

          //Use that pointer in this scope
          that.removeEmitter(emitter);

          enemyHandler.createEnemy();
      }
///////////////////////////////////////////////////////////////////////////////////////

      pandaImg.sprite.touchstart = pandaImg.sprite.mousedown;
////////////////// ARROWS

      var lArrow = new AddSprite(
        (game.system.width / 4) - 50,
        570,
        'l_arrow'
        );
      var rArrow = new AddSprite(
        (game.system.width / 4) * 3 + 50,
        570,
        'r_arrow'
        );

      lArrow.sprite.interactive = true;
      rArrow.sprite.interactive = true;

      lArrow.sprite.mousedown = function(){
        var lEdge = (backgroundImg.sprite.x - backgroundImg.sprite.width/2);
        var notReachedLeftEdge = pandaImg.sprite.x - (pandaImg.sprite.width/2) - CONST_MOVEMENT > lEdge;
        if(notReachedLeftEdge)
          {
            that.panda_L_tween = new game.Tween(pandaImg.sprite.position);
          that.panda_L_tween.to({x:(backgroundImg.sprite.x - (backgroundImg.sprite.width/2))}, ((pandaImg.sprite.x-lEdge)/(backgroundImg.sprite.width/2))*1000);
          that.panda_L_tween.start();
            //pandaImg.sprite.x -= CONST_MOVEMENT;
            //emitter.position.set(pandaImg.sprite.x, pandaImg.sprite.y);
          }
      };
      rArrow.sprite.mousedown = function(){
        var rEdge = (backgroundImg.sprite.x+backgroundImg.sprite.width/2);
        var notReachedRightEdge = (pandaImg.sprite.x + (pandaImg.sprite.width/2) + CONST_MOVEMENT) < rEdge;
        if(notReachedRightEdge)
          {
            that.panda_R_tween = new game.Tween(pandaImg.sprite.position);
          that.panda_R_tween.to({x:(backgroundImg.sprite.x + (backgroundImg.sprite.width/2))}, ((rEdge-pandaImg.sprite.x)/(backgroundImg.sprite.width/2))*1000);
          that.panda_R_tween.start();

            //pandaImg.sprite.x += CONST_MOVEMENT;
            //emitter.position.set(pandaImg.sprite.x, pandaImg.sprite.y);
          }
      }

    lArrow.sprite.mouseup = function(){
      that.panda_L_tween.stop();
      that.panda_L_tween=null;
    }

    rArrow.sprite.mouseup = function(){
      that.panda_R_tween.stop();
      that.panda_R_tween=null;
    }

    lArrow.sprite.touchstart = lArrow.sprite.mousedown;
    rArrow.sprite.touchstart = rArrow.sprite.mousedown;
    lArrow.sprite.touchend = lArrow.sprite.mouseup;
    rArrow.sprite.touchend = rArrow.sprite.mouseup;
      //alert("Click the panda to start");

      
    }

    
    
  });
        
  SceneEnd = game.Scene.extend({
    backgroundColor: 0x000000,

    init: function(){
     


    }
  });

});





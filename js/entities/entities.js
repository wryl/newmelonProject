// TODO
game.mainPlayer=me.ObjectEntity.extend({
    init:function (x,y){
        var settings={};
        settings.width=110;
        settings.height=110;
        settings.spritewidth=161;
        settings.spriteheight=164;

        this.parent(x, y, settings);
        this.mutipleJump = 1;
        this.setVelocity(5, 23);

       // this.alwaysUpdate = true;
        this.collidable=true;

       this.renderable=game.texture.createAnimationFromName([ "1.png",  "2.png",  "3.png",  "4.png",  "5.png",  "6.png",  "7.png",  "8.png",  "9.png",  "10.png",  "11.png"]);
this.renderable.addAnimation("run",[0, 1, 2,3,4,5,6,7,8,9,10],30);
        this.renderable.addAnimation("jump", [9]);
        this.renderable.setCurrentAnimation("run");
       // me.game.viewport.follow(this, me.game.viewport.AXIS.HORIZONTAL);

    },
    update:function(dt){
        this.vel.x += this.accel.x * me.timer.tick;
        me.game.viewport.move(this.accel.x * me.timer.tick,0);
    if(me.input.isKeyPressed('left'))
    {
        this.flipX(true);
    }
    else if (me.input.isKeyPressed('right'))
    {
        this.flipX(false);
    }
        if (me.input.isKeyPressed('jump')) {
            this.jumping = true;

            // reset the dblJump flag if off the ground
            this.mutipleJump = (this.vel.y === 0)?1:this.mutipleJump;

            if (this.mutipleJump<=2) {
                // easy 'math' for double jump
                this.vel.y -= (this.maxVel.y * this.mutipleJump++) * me.timer.tick;
               // me.audio.play("jump", false);
            }
        }
        this.updateMovement();
       return this.parent(dt);
    }

});
game.CoinEntity = me.CollectableEntity.extend({
    /**
     * constructor
     */
    init: function (x, y, settings) {


        this.parent(x, y, settings);
        // add the coin sprite as renderable
        this.renderable = game.texture.createSpriteFromName("coin.png");

        // set the renderable position to center
        this.anchorPoint.set(0.5, 0.5);

    },

    /**
     * collision handling
     */
    onCollision : function () {
        // do something when collide
        me.audio.play("cling", false);
        // give some score
        game.data.score += 250;

        //avoid further collision and delete it
        this.collidable = false;
        me.game.world.removeChild(this);
    }

});

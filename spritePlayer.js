//************************************************************************************
// Sprite sound player follows the same idea as image sprites.
// It's faster to download one large file vs. many small ones.
// It's especially important on mobile, where sound preloading is disabled.
// options :
// soundFileName - /sound/myAwesomeSoundFile - no extension it will determine the best format
// three files are required : mp3, ogg, wav
// sprites - sprites configuration,
//sprites = {
//    sound1: { start: 0, length: 7.0},
//    sound2: { start: 7.1, length: 9.0},
//    sound3: { start: 9.1, length: 10.0}
//};
// onStart - optional event handler to be called on start of the sprite playing
// onEnd - optional event handler to be called on start of the sprite playing

(function(root){


    var SpritePlayer=function(options){

        if (!options.hasOwnProperty("soundFileName"))
            throw "Sound file name needs to be present.";

        var soundNode=new Audio();
        soundNode.setAttribute("id", "main_sound");
        soundNode.volume=1;
        soundNode.preload="auto";
        var codecs= [{ext: "mp3", type: "audio/mpeg"},
                      {ext: "ogg", type: "audio/ogg"},
                      {ext: "wav", type: "audio/wav"}];

        for (var i=0; i<codecs.length; i++){
           var codec=codecs[i];
            if (!!soundNode.canPlayType(codec.type).replace(/no/, "")){
                soundNode.src=options.soundFileName+"."+codec.ext;
                break;
            }
        }

        //back reference for event handlers
        soundNode.player=this;

        if (!options.hasOwnProperty("sprites"))
            throw "Sprites configuration is required.";

        this._sprites=options.sprites;
        this._sound=soundNode;
        this.currentSprite="";
        this.isPlaying=false;
        this._onPlayDefault=options["onPlay"];
        this._onEndDefault=options["onEnd"];

        soundNode.addEventListener("playing",function(e){
            this.player.isPlaying=true;
            this.player._onPlay.call(this.player,{sprite: this.player.currentSprite});
        }, false);

        soundNode.addEventListener("timeupdate", function(e){
            var player=this.player;
            if (player.currentSprite.length==0 || !player.isPlaying) return;
            var currentSprite=player._sprites[player.currentSprite];
            var endTime=currentSprite.start+currentSprite.length;
            if (this.currentTime>endTime)
            {
                this.pause();
                this.player.isPlaying=false;
                this.player._onEnd.call(this.player,{sprite: this.player.currentSprite});
            }
        }, false);

    };

    SpritePlayer.prototype={

        play: function(sprite, onPlay, onEnd)
        {
            if (this._sprites && this._sprites.hasOwnProperty(sprite)){
                var player=this;
                player.currentSprite=sprite;
                player._onPlay = onPlay || player._onPlayDefault || function(){};
                player._onEnd = onEnd || player._onEndDefault || function(){};
                //waiting for the audio node to initialize
                var interval = (player._sound.readyState == 4) ? 0 : 30
                var waitForPlay=setInterval(
                    function(){
                        if(player._sound.readyState === 4) {
                            player._sound.currentTime=player._sprites[player.currentSprite]["start"];
                            player._sound.play();
                            clearInterval(waitForPlay);
                        }
                        else{
                              console.log("waiting for audio init.");
                        }
                    }, interval);
            }
            else
            {
                throw "Can't find sprite "+sprite;
            }
        },


        pause: function(){
            this._sound.pause();
            this.isPlaying=false;
        },


        volume: function(v){
            this._sound.volume(v);
        }


    }

    root.SpritePlayer=SpritePlayer;

})(this);
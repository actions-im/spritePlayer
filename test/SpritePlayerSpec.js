describe("Player", function() {

    var player=new SpritePlayer({
        sprites: {
            sound1: { start: 0, length: 1.0},
            sound2: { start: 9.1, length: 3.0},
            sound3: { start: 9.1, length: 10.0},
            shortSprite: {start: 5, length: 0.5}
        },
        soundFileName: "/test/sound/test-sound",
        onPlay: function(e){
                console.log("Started: " + e.sprite);
        },
        onEnd: function(e){
            console.log("Ended: " + e.sprite);
        }
     });

    it("should play a sprite", function() {
        runs(function(){
            player.play("sound1");
        }, 100);
        waitsFor(function() {
              return player.isPlaying;
        }, "Player should be playing", 100);
        runs(function(){
           expect(player.currentSprite).toEqual("sound1");
        })
    });

    it("should pause", function() {
        runs(function(){
          player.play("sound2");
          expect(player.currentSprite).toEqual("sound2");
        });
        waitsFor(function() {
          return player.isPlaying;
        }, "Player should be playing", 100);
        runs(function(){
          player.pause();
          expect(player.isPlaying).toBeFalsy();
        })
    });

    it("should stop after sprite is complete", function() {
        runs(function(){player.play("shortSprite");});
        waitsFor(function() {
            return player.isPlaying;
        }, "Player start playing", 100);
        waitsFor(function() {
            return !player.isPlaying;
        }, "Player should stop");
        runs(function(){
            expect(player.isPlaying).toBeFalsy();
        })
    });

    it("should make sprite specific call on play", function() {
        var currentSprite="";
        runs(function(){player.play("shortSprite", function(e){
            currentSprite= e.sprite;
        });});
        waitsFor(function() {
            return player.isPlaying;
        }, "Player should be playing");
        runs(function(){
            expect(currentSprite).toEqual("shortSprite");
        })
    });

    it("should make sprite specific call on sprite end", function() {
        var currentSprite="";
        runs(function(){player.play("shortSprite", null, function(e){
            currentSprite= e.sprite;
        });});
        waitsFor(function() {
            return !player.isPlaying;
        }, "Player should be playing");
        runs(function(){
            expect(currentSprite).toEqual("shortSprite");
        })
    });

});



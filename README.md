# sprite-player

Sound sprite player, which can be very useful for mobile animations.


## API

#Player setup:
The player example:

    var player=new SpritePlayer({
          sprites: {
              sound1: { start: 0, length: 1.0},
              sound2: { start: 1.1, length: 3.0},
              sound3: { start: 9.1, length: 10.0},
          },
          soundFileName: "/test/sound/test-sound",
          onPlay: function(e){
                  console.log("Started: " + e.sprite);
          },
          onEnd: function(e){
              console.log("Ended: " + e.sprite);
          }
       });

The player expects the sound file to be available in three formats: mp3, ogg, wav.
It automatically selects the best format for the specific browser.
For example it will play /test/sound/test-sound.mp3 on Chrome and /test/sound/test-sound.ogg on FireFox.
The player expects only one file name and automatically adds relevant extension.

###Sprites
In this case one large sound file /test/sound/test-sound contains three sprite: sound1, sound2, sound3.
Each sprite is marked { start: 1.1, length: 3.0}, where start: is a start of the sprite position in seconds starting from the start of main sound file.
Length is the length of the sprite in seconds.

##Playing the sprite.
  player.play("sound1") will play sound1 sprite.

##Call backs:

### Default callbacks
There are optional callback functions, which can track the begining and the end of each sprite.
onPlay can be played everytime the sprite starts playing.
onEnd can be played everytime the sprite ends playing.


### Sprite specific callbacks
  player.play("shortSprite", function(e){
              console.log("Override of onPlay callback for: " + e.sprite);
          })
        
  player.play("shortSprite", null,function(e){
              console.log("Override of onEnd callback for: " + e.sprite);
          })
        
        


Docs.

## License

MIT

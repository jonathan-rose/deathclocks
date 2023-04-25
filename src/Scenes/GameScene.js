import 'phaser';
import Speech from '../Objects/Speech';
import Hourglass from '../Objects/Hourglass';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }


    create ()
    {
        //GNU Terry Pratchett
        
        this.add.image(400, 300, 'gameBackground');
        var death = this.add.image(160, 200, 'death');
        var deathBlink = this.add.image(160, 200, 'deathEyesClosed');
        this.add.image(350, 220, 'scythe');
        this.add.image(400, 300, 'table');

        this.hourglasses = [new Hourglass(this, 100, 100, 'Hourglass1', 20)];

         //  Add a new instance of the Speech object
         var speechBox = new Speech(this, 0, 0, 'speechBG')
         this.add.existing(speechBox)

         // Update the message in the Speech object
         // (nested event to allow randomised delay)
         this.time.addEvent({
             delay: 8000,
             callback: () => {
                 const delay = Phaser.Math.RND.between(1000, 5000)
                 this.time.addEvent({
                     delay: delay,
                     callback: () => {
                         speechBox.randomiseMessage()
                     }
                 })
             },
             callbackScope: this,
             loop: true
         });

        // Make death blink on click
        deathBlink.setVisible(false);
        death.setInteractive();
        death.on('pointerdown', function(){
            deathBlink.setVisible(true);
            this.tweens.add({
                targets: deathBlink,
                completeDelay: 100,
                onComplete: (function () {
                    deathBlink.setVisible(false);
                    this.scene.start('End');
                    }.bind(this)),
                });
        }.bind(this));
    }

    /**
     * Returns the number of seconds remaining on the hourglass with
     * the least time left.
     */
    leastTimeLeft() {
        return this.hourglasses.map((h) => {
            return h.currentTimer.getOverallRemainingSeconds();
        }).reduce((a, b) => {
            return Math.min(a, b);
        }, 99999);
    }


    update ()
    {
        this.hourglasses.forEach((h) => {h.update();});

        // Figure out what kind of music we should be playing.
        let remaining = this.leastTimeLeft();
        if (remaining >= 10) {
            this.defaultMusic();
        }
        if (remaining < 10) {
            this.fasterMusic();
        }
        if (remaining < 5) {
            this.finalMusic();
        }
        if (remaining <= 0) {
            this.scene.start('End');
        }
    }

    /**
     * OK, sorry, these functions aren't particularly elegant, but
     * they should work, and they should be idempotent so we can just
     * keep calling whichever one is appropriate each  update.
     */
    defaultMusic() {
        this.sys.game.globals.musicTracks[0].volume = 0.5;
        this.sys.game.globals.musicTracks[1].volume = 0;
        this.sys.game.globals.musicTracks[2].volume = 0;
    }
    fasterMusic() {
        this.sys.game.globals.musicTracks[0].volume = 0.5;
        this.sys.game.globals.musicTracks[1].volume = 0.5;
        this.sys.game.globals.musicTracks[2].volume = 0;
    }
    finalMusic() {
        this.sys.game.globals.musicTracks[0].volume = 0.5;
        this.sys.game.globals.musicTracks[1].volume = 0.5;
        this.sys.game.globals.musicTracks[2].volume = 0.5;
    }
}

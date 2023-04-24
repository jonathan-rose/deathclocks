import 'phaser';
import Speech from '../Objects/Speech';
import Hourglass from '../Objects/Hourglass';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }


    create ()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'gameBackground');
        var death = this.add.image(160, 200, 'death');
        var deathBlink = this.add.image(160, 200, 'deathEyesClosed');
        this.add.image(350, 220, 'scythe');
        this.add.image(400, 300, 'table');

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
                    }.bind(this)),
                });            
        }.bind(this));
  
        this.testHourglass = new Hourglass(this, 400, 450, 'Hourglass1', 30);
    }

    update ()
    {
        console.log(Math.floor(this.testHourglass.currentTimer.getElapsedSeconds()));

    }
}
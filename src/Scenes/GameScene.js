import 'phaser';
import Speech from '../Objects/Speech';

var testSpeech;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }


    create ()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'background');

        //  Add a new instance of the Speech object
        testSpeech = new Speech(this, 0, 0, 'speechBG')
        this.add.existing(testSpeech)

        // Update the message in the Speech object
        // (nested event to allow randomised delay)
        this.time.addEvent({
            delay: 8000,
            callback: () => {
                const delay = Phaser.Math.RND.between(1000, 5000)
                this.time.addEvent({
                    delay: delay,
                    callback: () => {
                        testSpeech.randomiseMessage()
                    }
                })
            },
            callbackScope: this,
            loop: true
        });
    }

    update ()
    {

    }
}
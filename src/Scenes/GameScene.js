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

        // Add randomly generated speech text to appear/disappear on a timer
        testSpeech = new Speech(this, 50, 50, '',)

        this.time.addEvent({
            delay: 3000,
            callback: () => {
                console.log('callback')
                if (testSpeech) {
                    testSpeech.destroy() // TO_DO: figure out why this won't work!
                    testSpeech = null
                    console.log('speech destroyed')
                } else if (!testSpeech) {
                    testSpeech = new Speech(this, 50, 50, '')
                    console.log('made new box')
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    update ()
    {

    }
}
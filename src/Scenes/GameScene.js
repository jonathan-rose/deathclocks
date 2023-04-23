import 'phaser';
import Hourglass from '../Objects/Hourglass'

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }


    create ()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'background');
        this.add.image(400, 300, 'Death');
  
        this.testHourglass = new Hourglass(this, 100, 100, 'Hourglass1', 30);

    }

    update ()
    {
        console.log(Math.floor(this.testHourglass.currentTimer.getElapsedSeconds()));
    }
};
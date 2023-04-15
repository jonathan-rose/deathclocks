import 'phaser';
import DeathTimer from '../Objects/DeathTimer';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }


    create ()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'background');

        this.DeathTimer = new DeathTimer(this, 200, 300, 'Hourglass', 5);
    }

    update ()
    {
        console.log(Math.floor(this.DeathTimer.currentTimer.getElapsedSeconds()));
    }
};
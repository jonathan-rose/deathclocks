import 'phaser';
import Button from '../Objects/Button';
import Speech from '../Objects/Speech';
import Hourglass from '../Objects/Hourglass';

export default class HowToPlayScene extends Phaser.Scene {
    constructor () {
        super('HowToPlay');
    }

    create () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;

        this.add.image(400, 300, 'gameBackground');
        var death = this.add.image(160, 200, 'death');
        var deathBlink = this.add.image(160, 200, 'deathEyesClosed');
        this.add.image(350, 220, 'scythe');
        this.add.image(400, 300, 'table');

        var speechBox = new Speech(this, 0, 0, 'speechBG');
        this.add.existing(speechBox);

        speechBox.howToPlayMessage();


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

        this.testHourglass = new Hourglass(this, 500, 400, 'Hourglass1', 30);

        this.menuButton = new Button(this, config.width * 0.5, 500, 'Button', 'ButtonPressed', 'Play', 'Game');
    }
};

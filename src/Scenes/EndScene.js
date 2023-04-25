import 'phaser';
import Button from '../Objects/Button';
import MenuSand from '../Objects/MenuSand';

export default class EndScene extends Phaser.Scene {
    constructor () {
        super('End');
    }

    create () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;
        this.add.image(config.width/2, config.height/2, 'aboutBG');
        var death = this.add.image(150, 450, 'death');
        var deathBlink = this.add.image(150, 450, 'deathEyesClosed');
        //this.add.image(350, 470, 'scythe');

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

        this.menuButton = new Button(this, config.width * 0.5, 480, 'Button', 'ButtonPressed', 'Menu', 'Title');
        this.menuSand = new MenuSand(this, config.width * 0.7);

        this.add.text(config.width * 0.5, 100, 'You Died.', { fontSize: 50 , fill: '#ffad0a' }).setOrigin(0.5);
        this.add.text(config.width * 0.3, 205, ' Life extended by: ', { fontSize: 24 , fill: '#ffad0a'});
        this.add.text(config.width * 0.3, 245, ' INSERT TOTAL TIME HERE', { fontSize: 24 , fill: '#ffad0a'});

    }
};

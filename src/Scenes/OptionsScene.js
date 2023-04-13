import 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
    constructor () {
        super('Options');
    }


    create () {
        this.model = this.sys.game.globals.model;
        var config = this.game.config;

        this.add.image(config.width/2, config.height/2, 'aboutBG');

        this.text = this.add.text(300, 100, 'Options', { fontSize: 40 , fill: '#000'});
        this.musicButton = this.add.image(200, 200, 'checkedBox');
        this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 , fill: '#000'});

        this.soundButton = this.add.image(200, 300, 'checkedBox');
        this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24, fill: '#000' });

        this.musicButton.setInteractive();
        this.soundButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
            this.model.musicOn = !this.model.musicOn;
            this.updateAudio();
        }.bind(this));

        this.soundButton.on('pointerdown', function () {
            this.model.soundOn = !this.model.soundOn;
            this.updateAudio();
        }.bind(this));

        this.updateAudio();

        this.menuButton = new Button(this, 400, 500, 'Button', 'ButtonPressed', 'Menu', 'Title');
        this.updateAudio();
    }

    updateAudio() {
        if (this.model.musicOn === false) {
            this.musicButton.setTexture('box');
            this.sys.game.globals.bgMusic.stop();
            this.model.bgMusicPlaying = false;
        } else {
            this.musicButton.setTexture('checkedBox');
            if (this.model.bgMusicPlaying === false) {
                this.sys.game.globals.bgMusic.play();
                this.model.bgMusicPlaying = true;
            }
        }

        if (this.model.soundOn === false) {
            this.soundButton.setTexture('box');
        } else {
            this.soundButton.setTexture('checkedBox');
        }
    }
};

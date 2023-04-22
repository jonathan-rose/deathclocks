import 'phaser';
import Button from '../Objects/Button';
import MenuSand from '../Objects/MenuSand';

export default class OptionsScene extends Phaser.Scene {
    constructor () {
        super('Options');
    }


    create () {
        this.model = this.sys.game.globals.model;
        var config = this.game.config;

        this.add.image(config.width/2, config.height/2, 'aboutBG');

        this.text = this.add.text(300, 100, 'OPTIONS', { fontSize: 50 , fill: '#ffad0a'});
        this.musicButton = this.add.image(200, 250, 'checkedBox');
        this.musicText = this.add.text(250, 240, 'Music Enabled', { fontSize: 24 , fill: '#ffad0a'});

        this.soundButton = this.add.image(200, 350, 'checkedBox');
        this.soundText = this.add.text(250, 340, 'Sound Enabled', { fontSize: 24, fill: '#ffad0a' });

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

        this.menuSand = new MenuSand(this, config.width * 0.7);
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

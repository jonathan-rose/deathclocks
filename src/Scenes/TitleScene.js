import 'phaser';
import Button from '../Objects/Button';
import MenuSand from '../Objects/MenuSand';

export default class TitleScene extends Phaser.Scene {
    constructor () {
	super('Title');
    }

    create () {
	var config = this.game.config;

        this.add.image(config.width/2, config.height/2, 'menuBG');

        // Play
        this.gameButton = new Button(
            this,
            config.width * 0.6 + 5,
            config.height * 0.5 - 100,
            'Button',
            'ButtonPressed',
            'Play',
            'Game'
        );

        // Options
        this.optionsButton = new Button(
            this,
            config.width * 0.35 - 5,
            config.height * 0.5 + 50,
            'Button',
            'ButtonPressed',
            'Options',
            'Options'
        );

        // About
        this.aboutButton = new Button(
            this,
            config.width * 0.6 + 5,
            config.height * 0.5 + 200,
            'Button',
            'ButtonPressed',
            'About',
            'About'
        );

        // add falling sand
        this.menuSand = new MenuSand(this);

        this.model = this.sys.game.globals.model;

        if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.model.bgMusicPlaying = true;
            this.sys.game.globals.bgMusic = this.bgMusic;
        } else if (this.model.musicOn === false && this.model.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
            this.bgMusic.stop();
            this.model.bgMusicPlaying = false;
            this.sys.game.globals.bgMusic = this.bgMusic;
        }
    }
};

import 'phaser';
import Button from '../Objects/Button';
import MenuSand from '../Objects/MenuSand';

export default class TitleScene extends Phaser.Scene {
    constructor () {
	   super('Title');
    }

    create () {
	var config = this.game.config;

        this.add.image(config.width/2, config.height/2, 'titleBG'); //menuBG
        this.add.image(config.width/3.5, config.height/4, 'logo');
        this.add.image(config.width/9, config.height * 0.85, 'hourglassTilted');

        // Play
        this.gameButton = new Button(
            this,
            config.width * 0.75 + 7,
            config.height * 0.5 - 100,
            'Button',
            'ButtonPressed',
            'Play',
            'Game'
        );

        // Options
        this.optionsButton = new Button(
            this,
            config.width * 0.5 - 3,
            config.height * 0.5 + 50,
            'Button',
            'ButtonPressed',
            'Options',
            'Options'
        );

        // About
        this.aboutButton = new Button(
            this,
            config.width * 0.75 + 7,
            config.height * 0.5 + 200,
            'Button',
            'ButtonPressed',
            'Credits',
            'About'
        );

        // add falling sand
        this.menuSand = new MenuSand(this, config.width * 0.65);

        this.model = this.sys.game.globals.model;

        this.music1 = this.sound.add('track1', { volume: 0.5, loop: true });
        this.music2 = this.sound.add('track2', { volume: 0, loop: true });
        this.music3 = this.sound.add('track3', { volume: 0, loop: true });

        this.sys.game.globals.musicTracks = [this.music1, this.music2, this.music3];
        if (this.model.musicOn === true && this.model.musicPlaying === false) {
            this.music1.play();
            this.music2.play();
            this.music3.play();
            this.model.musicPlaying = true;
        } else if (this.model.musicOn === false && this.model.musicPlaying === false) {
            this.sys.game.globals.musicTracks.forEach((m) => {m.volume = 0;});
        }
    }
};

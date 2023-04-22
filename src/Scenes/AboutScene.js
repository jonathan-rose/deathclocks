import 'phaser';
import Button from '../Objects/Button';
import MenuSand from '../Objects/MenuSand';

export default class AboutScene extends Phaser.Scene {
    constructor () {
        super('About');
    }


    create () {
        var config = this.game.config;
        this.model = this.sys.game.globals.model;
        this.add.image(config.width/2, config.height/2, 'aboutBG');

        this.add.text(config.width*0.1, config.height*0.11, 'About Page \n\nSpace to write about your game \nor a how to play. \n', { align: 'center', fontSize: '25px', fill: '#000' });
        this.menuButton = new Button(this, 400, 480, 'Button', 'ButtonPressed', 'Menu', 'Title');

        this.menuSand = new MenuSand(this, config.width * 0.7);

    }

};

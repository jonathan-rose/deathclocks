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

        this.menuButton = new Button(this, config.width * 0.5, 480, 'Button', 'ButtonPressed', 'Menu', 'Title');
        this.menuSand = new MenuSand(this, config.width * 0.7);

        this.add.text(config.width * 0.5, 100, 'Brought to you by:', { fontSize: 50 , fill: '#ffad0a' }).setOrigin(0.5);
        this.add.text(config.width * 0.5, 220, ' Jon: everything', { fontSize: 24 , fill: '#ffad0a'}).setOrigin(0.5);
        this.add.text(config.width * 0.5, 260, ' Mae: everything', { fontSize: 24 , fill: '#ffad0a'}).setOrigin(0.5);
        this.add.text(config.width * 0.5, 300, 'Beth: everything', { fontSize: 24 , fill: '#ffad0a'}).setOrigin(0.5);
        this.add.text(config.width * 0.5, 340, 'Dave: everything', { fontSize: 24 , fill: '#ffad0a'}).setOrigin(0.5);

    }
};

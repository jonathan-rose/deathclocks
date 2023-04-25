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
        this.add.text(config.width * 0.3, 205, ' Jon: everything but music', { fontSize: 24 , fill: '#ffad0a'});
        this.add.text(config.width * 0.3, 245, ' Mae: everything but music', { fontSize: 24 , fill: '#ffad0a'});
        this.add.text(config.width * 0.3, 285, 'Beth: everything but music', { fontSize: 24 , fill: '#ffad0a'});
        this.add.text(config.width * 0.3, 325, 'Dave: everything but music', { fontSize: 24 , fill: '#ffad0a'});
        this.add.text(config.width * 0.3, 365, '  PJ: music', { fontSize: 24 , fill: '#ffad0a'});

    }
};

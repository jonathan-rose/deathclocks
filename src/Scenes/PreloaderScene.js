import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor () {
        super('Preloader');
    }

    preload () {
        // add logo image
        var logo = this.add.image(400, 120, 'logo');
        logo.setScale(0.45);

        // display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // update file progress text
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // load assets needed in our game

        this.load.audio('track1', ['assets/audio/track1.mp3']);
        this.load.audio('track2', ['assets/audio/track2.mp3']);
        this.load.audio('track3', ['assets/audio/track3.mp3']);

        this.load.image('titleBG', 'assets/titleBG.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('Button', 'assets/button1.png');
        this.load.image('ButtonPressed', 'assets/button1selected.png');
        this.load.image('hourglassTilted', 'assets/hourglassTilted.png');
        
        this.load.image('aboutBG', 'assets/background.png');
        this.load.image('box', 'assets/box.png');
        this.load.image('checkedBox', 'assets/checked1.png');

        this.load.image('gameBackground', 'assets/gameBackground.png');
        this.load.image('death', 'assets/deathSmall.png');
        this.load.image('deathEyesClosed', 'assets/deathSmallEyesClosed.png');
        this.load.image('scythe', 'assets/scythe.png');
        this.load.image('table', 'assets/table.png');
        this.load.image('Hourglass1', 'assets/hourglass1.png');

        this.load.image('Hourglass1-mask', 'assets/hourglass1-mask.png');
        this.load.image('speechBG', 'assets/speechBG.png');

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.ready();
        }.bind(this));

        this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
    }

    create () {
    }

    init () {
        this.readyCount = 0;
    }

    ready () {
        this.scene.start('Title');
        // this.readyCount++;
        // if (this.readyCount === 20) {
        //     this.scene.start('Credits');
        // }
    }
};

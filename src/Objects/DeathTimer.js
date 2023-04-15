import 'phaser';

export default class DeathTimer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.tweens = this.scene.tweens;
        this.isRotating = false;

        this.setInteractive();
        this.scene.add.existing(this);

        this.on('pointerdown', this.rotateTimer);
    }

    rotateTimer () {
        if (this.isRotating === false) {
            this.tweens.add({
                targets: this,
                angle: '+=180',
                onComplete: (function () { 
                    this.isRotating = false 
                    }.bind(this)),
                });
            this.isRotating = true;
        }
    }
}
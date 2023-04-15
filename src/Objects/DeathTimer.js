import 'phaser';

export default class DeathTimer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, duration) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.tweens = this.scene.tweens;
        this.time = this.scene.time;
        this.currentTimer = new Phaser.Time.TimerEvent;
        this.isRotating = false;
        this.duration = duration * 1000
       
        this.timerConfig = {
            delay: this.duration,
            callback: this.finishTimer
        }


        this.setInteractive();
        this.scene.add.existing(this);

        this.addTimer();


        this.on('pointerdown', this.rotateTimer);
    }

    rotateTimer () {
        if (this.isRotating === false) {
            this.tweens.add({
                targets: this,
                angle: '+=180',
                onComplete: (function () { 
                    this.isRotating = false;
                    this.resetTimer();
                    }.bind(this)),
                });
            this.isRotating = true;
        }
    }

    addTimer () {
        this.currentTimer = this.time.addEvent(this.timerConfig);
        console.log("Timer added");
    }

    resetTimer () {
        // Resetting a timer is weird
        console.log("Timer reset");
    }

    finishTimer () {
        console.log("Timer finished");
    }
}
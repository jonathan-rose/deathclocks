import 'phaser';

export default class Hourglass extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, duration) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.isRotating = false;

        this.texture = new Phaser.GameObjects.Image(this.scene, 0, 0, texture);
        this.setSize(this.texture.width, this.texture.height);
        this.add(this.texture);
        
        this.duration = duration * 1000
        this.currentTimer = new Phaser.Time.TimerEvent();
        this.timerConfig = {
            delay: this.duration,
            callback: this.finishTimer
        }
        this.addTimer();

        this.on('pointerdown', this.rotateContainer);
        this.setInteractive();

        this.scene.add.existing(this);
    }

    rotateContainer () {
        if (this.isRotating === false) {
            this.scene.tweens.add({
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
        this.currentTimer = this.scene.time.addEvent(this.timerConfig);
        console.log("Timer added");
    }

    resetTimer () {
        // Resetting with .reset() doesn't actually reset it.
        // If the existing timer completes then it deactivates
        // and doesn't continue running, even when reset.
        // This is why I create a new timer instead.
        // Also the in-built getRemaining method seems to be missing?
        let timeElapsed = this.currentTimer.getElapsed();
        let timeRemaining = this.currentTimer.delay - timeElapsed;

        this.currentTimer.remove();
        this.currentTimer.elapsed = 0;
        this.currentTimer = this.scene.time.addEvent({
            delay: this.timerConfig.delay,
            callback: this.timerConfig.callback,
            startAt: timeRemaining
        });

        console.log("Timer reset");
    }

    finishTimer () {
        console.log("Timer finished");
    }
}
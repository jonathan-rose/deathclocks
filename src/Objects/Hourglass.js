import 'phaser';

export default class Hourglass extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, duration) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.isRotating = false;

        // Texture setup
        // X and Y are relative to container, hence (0,0).
        this.texture = new Phaser.GameObjects.Image(this.scene, 0, 0, texture);
        
        // Timer setup
        this.duration = duration * 1000
        this.currentTimer = new Phaser.Time.TimerEvent();
        this.timerConfig = {
            delay: this.duration,
            callback: this.finishTimer
        }

        // Interactivitiy
        // setSize() is necessary for making container clickable
        this.on('pointerdown', this.rotateContainer);
        this.setSize(this.texture.width, this.texture.height);
        this.setInteractive();

        this.add(this.texture);
        this.scene.add.existing(this);
    }

    rotateContainer () {
        if (this.isRotating === false) {
            this.scene.tweens.add({
                targets: this,
                angle: '+=180',
                onComplete: (function () { 
                    this.isRotating = false;
                    this.swapTimer();
                    }.bind(this)),
                });
            this.isRotating = true;
        }
    }

    addTimer () {
        this.currentTimer = this.scene.time.addEvent(this.timerConfig);
        console.log("Timer added");
    }

    swapTimer () {
        // Resetting with .reset() doesn't actually reset it,
        // as when the existing timer completes then it deactivates
        // itself and doesn't continue running, even after reset().
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
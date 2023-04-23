import 'phaser';
import { GameObjects } from 'phaser';

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

        // Create sand
        this.pointA = new Phaser.Math.Vector2(0, 0);
        this.pointB = new Phaser.Math.Vector2(0, 0 + (this.texture.height / 2));
        this.sandToggle = false;

        this.topSand = new Phaser.GameObjects.Rectangle(
            this.scene,
            0,
            this.pointA.y,
            this.texture.width,
            (this.texture.height / 2),
            0xFFFFFF
        );
        this.topSand.setOrigin(0.5, 0);

        this.bottomSand = new Phaser.GameObjects.Rectangle(
            this.scene,
            0,
            this.pointB.y,
            this.texture.width,
            (this.texture.height / 2),
            0x000000
        );
        this.bottomSand.setOrigin(0.5, 1);

        // Interactivitiy
        // setSize() is necessary for making container clickable
        this.on('pointerdown', this.rotateContainer);
        this.setSize(this.texture.width, this.texture.height);
        this.setInteractive();

        // Add parts to Container
        this.add(this.topSand);
        this.add(this.bottomSand);
        this.add(this.texture);
        this.addTimer();
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
                    this.swapSand();
                    }.bind(this)),
                });
            this.isRotating = true;
        }
    }

    addTimer () {
        this.currentTimer = this.scene.time.addEvent(this.timerConfig);
        // this.animateSand();
        console.log("Timer added");
    }

    // animateSand () {
    //     this.topSandTween = this.scene.tweens.add({
    //         targets: this.topSand,
    //         duration: this.duration / 2,
    //         height: 0          
    //     })

    //     this.bottomSandTween = this.scene.tweens.add({
    //         targets: this.bottomSand,
    //         duration: this.duration / 2,
    //         height: -(this.texture.height / 2)        
    //     })
    // }

    swapSand () {
        if (this.sandToggle === false) {
            this.topSand.y = this.pointB.y;
            this.bottomSand.y = this.pointA.y;
        } else if (this.sandToggle === true) {
            this.topSand.y = this.pointA.y;
            this.bottomSand.y = this.pointB.y;
        }
        this.sandToggle = !this.sandToggle;
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

    update () {
        let progressRatio = (this.currentTimer.getElapsed() / this.duration).toFixed(2);
        let inverseProgressRatio = 1 - progressRatio;

        this.topSand.setScale(1, -inverseProgressRatio);
        this.bottomSand.setScale(1, progressRatio);
    }
}
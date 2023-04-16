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
        this.currentTimer = new Phaser.Time.TimerEvent();
        this.isRotating = false;
        this.duration = duration * 1000
        this.topLeft = this.getTopLeft();
        this.scene.add.existing(this);
        this.timerConfig = {
            delay: this.duration,
            callback: this.finishTimer
        }
        this.setDepth(1);

        this.container = new Phaser.GameObjects.Container(this.scene);
        scene.add.existing(this.container);

        this.sand = new Phaser.GameObjects.Rectangle(
            this.scene,
            this.x,
            this.y,
            this.width,
            this.height,
            0xCBA413
            );
        this.sand.setDepth(-1);

        this.container.add(this.sand);

        // this.container.add(this);


        // CHANGE THIS SO THAT STUFF GETS ADDED TO DEATHTIMER OBJECT
        // NOT TO SCENE
        // SO THEY ALL ROTATE TOGETHER

        // this.scene.add.existing(this.sand);

        // this.sand.setOrigin(0.5, 1);

        // this.maskGraphics = this.scene.add.graphics();
        // this.maskGraphics.clear();
        // this.maskGraphics.fillStyle(0xFFFFFF, 0.5);
        // this.maskGraphics.fillCircle(this.topLeft.x, this.topLeft.y + this.height / 2, this.width / 2);

        // this.geometryMask = new Phaser.Display.Masks.GeometryMask(this.scene, this.maskGraphics);
        // this.geometryMask.invertAlpha = true;
        // this.mask = this.geometryMask;

        // this.maskGraphics.fillRect(
        //     this.topLeft.x, 
        //     this.topLeft.y, 
        //     this.width, 
        //     this.height / 2
        //     );

        // this.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.maskGraphics);
  
        this.setInteractive();

        // this.scene.add.existing(this);

        this.addTimer();

        this.on('pointerdown', this.rotateTimer);
    }

    rotateTimer () {
        if (this.isRotating === false) {
            this.tweens.add({
                targets: [this, this.sand],
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
        // Resetting with .reset() doesn't actually reset it
        // If the existing timer completes then it deactivates
        // And doesn't continue running, even when reset
        // This is why I create a new timer instead
        // Also the in-built getRemaining method seems to be missing?s
        let timeElapsed = this.currentTimer.getElapsed();
        let timeRemaining = this.currentTimer.delay - timeElapsed;

        this.currentTimer.remove();
        this.currentTimer.elapsed = 0;
        this.currentTimer = this.time.addEvent({
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
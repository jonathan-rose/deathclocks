import 'phaser';

import Util from '../Util';

export default class MenuSand extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.w = this.scene.cameras.main.width;
        this.h = this.scene.cameras.main.height;

        // can specify the resolution of the sand grains
        this.grainSize = 5;

        // 2d sand grain array
        this.sandGrid = [];

        // populate the grid with sand-coloured Rectangles
        for (let i = 0; i < this.h / this.grainSize; i++) {
            let row = [];
            for (let j = 0; j < this.w / this.grainSize; j++) {
                let r = new Phaser.GameObjects.Rectangle(
                    this.scene,
                    j * this.grainSize ,
                    i * this.grainSize ,
                    this.grainSize ,
                    this.grainSize ,
                    0xFFCF70
                );

                // make sure grains are centered
                r.displayOriginX = 0.5;
                r.displayOriginY = 0.5;

                // everything starts transparent
                r.setAlpha(0);

                // sand can't move into spaces containing buttons
                if (this.touchesButton(r)) {
                    r.contains = "BLOCKED";
                } else {
                    r.contains = "EMPTY";
                }

                this.scene.add.existing(r);
                row.push(r);
            }
            this.sandGrid.push(row);
        }

        // set animation timer to add and update sand
        this.scene.time.addEvent({
            delay: 10,
            loop: true,
            callback: this.tick,
            callbackScope: this
        });
    }

    /**
     * Check if the current grain touches any of the menu buttons.
     */
    touchesButton(grain) {
        let overlaps =  Phaser.Geom.Rectangle.Overlaps;
        return Util.any([
            overlaps(grain.getBounds(), this.scene.gameButton.getBounds()),
            overlaps(grain.getBounds(), this.scene.optionsButton.getBounds()),
            overlaps(grain.getBounds(), this.scene.aboutButton.getBounds())
        ]);
    };

    /**
     * Get the grain at an x, y position on the grid.
     */
    get(x, y) {
        return this.sandGrid[y][x];
    }

    /**
     * Set the `contains` value and opacity of a grain at an x, y
     * position on the grid.
     */
    set(x, y, v) {
        this.get(x, y).contains = v;
        switch(v) {
        case "EMPTY":
            this.get(x, y).setAlpha(0);
            break;
        case "SAND":
            this.get(x, y).setAlpha(1);
            break;
        }
    }

    isSand(x, y) {
        return this.get(x, y).contains == "SAND";
    }

    isEmpty(x, y) {
        return this.get(x, y).contains == "EMPTY";
    }

    /**
     * This is the main sand movement algorithm.
     *
     * For each grid space containing sand, check if the space below is
     * empty. If so, move the sand down.
     *
     * Otherwise, pick a random space below and to the side (either
     * one or two spaces left or right). If that new tile is empty,
     * move the sand there.
     */
    updatePos(x, y) {
        // weighted random direction, alters the `angle of repose` of
        // the sand piles for all you soil mechanics enthusiasts.
        let dir = Util.randNth([1, 1, 1, 2, -1, -1, -1, -2]);

        // if the current space is sand
        if (this.isSand(x, y)) {
            // ensure the space below is on grid
            if (y + 1 >= this.h / this.grainSize) {
                return;
            }
            // the space below is empty
            if (this.isEmpty(x, y + 1)) {
                // move sand down
                this.set(x, y, "EMPTY");
                this.set(x, y + 1, "SAND");
            } else {
                // ensure the space diagonally below is on grid
                if (x + dir < 0 ||
                    x + dir >= this.w / this.grainSize) {
                    return;
                }
                // the space diagonally below is empty
                if (this.isEmpty(x + dir, y + 1)) {
                    // move sand diagonally
                    this.set(x, y, "EMPTY");
                    this.set(x + dir, y + 1, "SAND");
                }
            }
        }
    }

    /**
     * Update all grid spaces.
     *
     * Loop through the rows from the bottom up so each grain only
     * gets updated once per tick.
     */
    updateAllPos() {
        for (let i = (this.h / this.grainSize) - 1; i >= 0; i--) {
            for (let j = 0; j < this.w / this.grainSize; j++) {
                this.updatePos(j, i);
            }
        }
    }

    /**
     * Add new sand at the top of the scene.
     */
    addSand() {
        if (Math.random() < 0.5) {
            let half = Math.floor((this.w / this.grainSize) / 2);
            let offset = Math.floor(Math.random() * 3);
            this.set(half + offset, 0, "SAND");
        }
    }

    /**
     * Progress the sand animation.
     */
    tick() {
        this.updateAllPos();
        this.addSand();
    }
}

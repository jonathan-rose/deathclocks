import 'phaser';

export default class Speech extends Phaser.GameObjects.Container {

    constructor(scene, x, y, texture) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = new Phaser.GameObjects.Image(this.scene, 400, 80, texture);

        // speech-box texture starts transparent
        this.texture.setAlpha(0);
        
        this.messages = [
            'DEATH: \"DON\'T THINK OF IT AS DYING. JUST THINK OF\nIT AS LEAVING EARLY TO AVOID THE RUSH.\"',
            'DEATH: \"THERE\'S NO JUSTICE. THERE\'S JUST ME.\"',
            'DEATH: \"MORTALS HAVE ONLY GOT A FEW YEARS IN THIS\nWORLD AND THEY SPEND THEM ALL MAKING THINGS\nCOMPLICATED FOR THEMSELVES. FASCINATING.\"',
            'DEATH: \"WHAT IS THAT SENSE INSIDE YOUR HEAD OF\nWISTFUL REGRET THAT THINGS ARE THE WAY THEY\nAPPARENTLY ARE?\"',
            'DEATH: \"TO CHANGE THE FATE OF ONE INDIVIDUAL IS\nTO CHANGE THE WORLD.\"'
        ];

        this.text = new Phaser.GameObjects.Text(this.scene, 45, 40, this.text, { align: 'left', fontSize: '24px', fill: '#000' });

        // add these properties as children of the container
        this.add(this.texture);
        this.add(this.text);
    } 

    randomiseMessage () {
        if (this.text._text === "") {
            const index = Phaser.Math.RND.between(0, 4)
            this.text.text = this.messages[index]
            this.texture.setAlpha(1)
        } else {
            this.text._text = ""
            this.texture.setAlpha(0)
        }
    }
}
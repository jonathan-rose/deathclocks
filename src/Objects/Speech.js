import 'phaser';

export default class Speech extends Phaser.GameObjects.Rectangle {

    constructor(scene, x, y, texture) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = new Phaser.GameObjects.Image(this.scene, 10, 20, texture);

        this.text = this.randomiseMessage()
    } 

    randomiseMessage () {
        console.log('start randomiseMessage')
        var messages = [
            'DEATH: \"DON\'T THINK OF IT AS DYING. JUST THINK OF\nIT AS LEAVING EARLY TO AVOID THE RUSH.\"',
            'DEATH: \"THERE\'S NO JUSTICE. THERE\'S JUST ME\"',
            'DEATH: \"MORTALS HAVE ONLY GOT A FEW YEARS IN THIS\nWORLD AND THEY SPEND THEM ALL MAKING THINGS\nCOMPLICATED FOR THEMSELVES. FASCINATING.\"',
            'DEATH: \"WHAT IS THAT SENSE INSIDE YOUR HEAD OF\nWISTFUL REGRET THAT THINGS ARE THE WAY THEY\nAPPARENTLY ARE?\"'

        ]
        var index = Phaser.Math.RND.between(0, 3)
        this.text = messages[index]
        console.log('this.text', this.text)
        this.scene.add.text(30, 40, this.text, { align: 'left', fontSize: '24px', fill: '#000' });
    }

}


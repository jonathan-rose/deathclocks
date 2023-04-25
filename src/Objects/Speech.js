import 'phaser';
import Util from '../Util';

export default class Speech extends Phaser.GameObjects.Container {

    constructor(scene, x, y, texture) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.texture = new Phaser.GameObjects.Image(this.scene, 400, 300, texture);

        // speech-box texture starts transparent
        this.texture.setAlpha(0);
        
        this.messages = [
            'DEATH: \"DON\'T THINK OF IT AS DYING. JUST THINK OF IT AS LEAVING EARLY TO AVOID THE RUSH.\"',
            'DEATH: \"THERE\'S NO JUSTICE. THERE\'S JUST ME.\"',
            'DEATH: \"MORTALS HAVE ONLY GOT A FEW YEARS IN THIS WORLD AND THEY SPEND THEM ALL MAKING THINGS COMPLICATED FOR THEMSELVES. FASCINATING.\"',
            'DEATH: \"WHAT IS THAT SENSE INSIDE YOUR HEAD OF WISTFUL REGRET THAT THINGS ARE THE WAY THEY APPARENTLY ARE?\"',
            'DEATH: \"TO CHANGE THE FATE OF ONE INDIVIDUAL IS TO CHANGE THE WORLD.\"'
        ];

        this.text = new Phaser.GameObjects.Text(this.scene, 330, 130, this.text, { align: 'left', fontSize: '24px', wordWrap: { width: 420, useAdvancedWrap: true }, fill: '#000' });

        // add these properties as children of the container
        this.add(this.texture);
        this.add(this.text);
    } 

    randomiseMessage () {
        if (this.text.text === "") {
            this.text.text = Util.randNth(this.messages);
            this.texture.setAlpha(0.5)
        } else {
            this.text.text = ""
            this.texture.setAlpha(0)
        }
    }
}
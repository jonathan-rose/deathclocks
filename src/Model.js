export default class Model {
    constructor() {
        this._soundOn = true;
        this._musicOn = false;
        this._bgMusicPlaying = false;
        this._highscore = 0;
    }
    
    set musicOn(value) {
        this._musicOn = value;
    }
    
    get musicOn() {
        return this._musicOn;
    }
    
    set soundOn(value) {
        this._soundOn = value;
    }
    
    get soundOn() {
        return this._soundOn;
    }
    
    set bgMusicPlaying(value) {
        this._bgMusicPlaying = value;
    }
    
    get bgMusicPlaying() {
        return this._bgMusicPlaying;
    }

    set highscore(value) {
        this._highscore = value;
    }

    get highscore() {
        return this._highscore;
    }

    
}

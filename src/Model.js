export default class Model {
    constructor() {
        this._soundOn = true;
        this._musicOn = true;
        this._musicPlaying = false;
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

    set musicPlaying(value) {
        this._musicPlaying = value;
    }

    get musicPlaying() {
        return this._musicPlaying;
    }

    set highscore(value) {
        this._highscore = value;
    }

    get highscore() {
        return this._highscore;
    }


}

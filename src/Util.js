export default class Util {
    /**
     * Select a random element from an array.
     */
    static randNth(xs) {
        return xs[Math.floor(Math.random() * xs.length)];
    }

    /**
     * Reducible boolean AND.
     */
    static and(a, b) {
        return a && b;
    }

    /**
     * Reducible boolean OR.
     */
    static or(a, b) {
        return a || b;
    }

    /**
     * Takes an array of boolean values, returns true if EVERY element is true.
     */
    static every(preds) {
        return preds.reduce(this.and);
    }

    /**
     * Takes an array of boolean values, returns true if ANY element is true.
     */
    static any(preds) {
        return preds.reduce(this.or);
    }
}

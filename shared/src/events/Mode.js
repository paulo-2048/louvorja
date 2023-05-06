export class Mode {

    constructor() {
        throw 'Cannot instantiate';
    }

    static get CONTROL() {
        return 'control';
    }

    static get PROJECTION() {
        return 'projection';
    }
}
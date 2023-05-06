import { Mode } from './Mode.js';

export class Participant {
    // FIXME vendor??? (louvor-ja)

    /** @type {Mode} */
    #mode

    /** @type {string} */
    #module

    /** @type {string} */
    #component

    constructor(mode, module, component) {
        this.#mode = mode;
        this.#module = module;
        this.#component = component;
    }

    get mode() {
        return this.#mode;
    }

    get module() {
        return this.#module;
    }

    get component() {
        return this.#component;
    }

    static of({mode, module, component}) {
        return new Participant(mode, module, component);
    }

    static control(module, component){
        return new Participant(Mode.CONTROL, module, component);
    }

    static projection(module, component){
        return new Participant(Mode.CONTROL, module, component);
    }
}

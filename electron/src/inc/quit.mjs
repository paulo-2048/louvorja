import { app } from 'electron';

class Holder {
    quit = false;
}

const HOLDER = new Holder();

export function quit() {
    HOLDER.quit = true;
    app.quit();
}

export function quitting() {
    return HOLDER.quit;
}
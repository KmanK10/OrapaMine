// Accessing engine internal is not ideal,
// this must be resolved! (later)
import * as loop from "../engine/core/loop.js";
// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";
import BlueLevel from "./blue_level.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
    }

    init() {
        
    }

    load() {
        
    }

    unload() {
        
    }

    draw() {
        
    }

    update() {
        
    }

    _initText(font, posX, posY, color, textH) {
        font.setColor(color);
        font.getXform().setPosition(posX, posY);

        font.setTextHeight(textH);
    }
}

window.onload = function () {
    engine.init("GLCanvas");
    let myGame = new MyGame();
    myGame.start();
}

export default MyGame;
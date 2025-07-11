// Accessing engine internal is not ideal,
// this must be resolved! (later)
import * as loop from "../engine/core/loop.js";
// import from engine/index.js for all engine symbols
import engine from "../engine/index.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        // Sprites
        this.kFontCon24 = "assets/fonts/consolas-24";
        this.kBg = "assets/board.png";
        // Objects
        this.mCamera = null;
        this.mBg = null;
    }

    init() {
        // Set up the camera
        this.mCamera = new engine.Camera(
            vec2.fromValues(5, 4), // position of the camera
            10, // width of camera
            [0, 0, 2657, 1974] // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([1, 1, 1, 1]); // Sets the background to white
        // Background
        this.mBg = new engine.SpriteRenderable(this.kBg);
        this.mBg.setColor([1, 1, 1, 0]);
        this.mBg.getXform().setPosition(5, 4);
        this.mBg.getXform().setSize(10, 8);
    }

    load() {
        engine.font.load(this.kFontCon24);
        engine.texture.load(this.kBg);
    }

    unload() {
        engine.font.unload(this.kFontCon24);
        engine.texture.unload(this.kBg);
    }

    draw() {
        engine.clearCanvas([1, 1, 1, 1]); // Clear to white
        this.mCamera.setViewAndCameraMatrix(); // Activate the drawing Camera
        this.mBg.draw(this.mCamera);
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
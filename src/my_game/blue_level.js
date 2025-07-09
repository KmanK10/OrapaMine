// Engine Core stuff
import engine from "../engine/index.js";
// Local stuff
import MyGame from "./my_game.js";
import SceneFileParser from "./util/scene_file_parser.js";

class BlueLevel extends engine.Scene {
    constructor() {
        super();
        // scene file name
        this.kSceneFile = "assets/blue_level.xml";
        // textures: (Note: jpg does not support transparency)
        this.kPortal = "assets/minion_portal.jpg";
        this.kCollector = "assets/minion_collector.jpg";
        // all squares
        this.mSqSet = []; // these are the Renderable objects
        // The camera to view the scene
        this.mCamera = null;
    }

    init() {
        let sceneParser = new SceneFileParser(this.kSceneFile);
        // Step A: Read in the camera
        this.mCamera = sceneParser.parseCamera();
        // Step B: Read all the squares and textureSquares
        sceneParser.parseSquares(this.mSqSet);
        sceneParser.parseTextureSquares(this.mSqSet);
    }

    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
        // Step B: activate the drawing camera
        this.mCamera.setViewAndCameraMatrix();
        // Step C: draw all the squares
        let i;
        for (i = 0; i < this.mSqSet.length; i++)
            this.mSqSet[i].draw(this.mCamera);
    }

    load() {
        // load the scene file
        engine.xml.load(this.kSceneFile);
        // load the textures
        engine.texture.load(this.kPortal);
        engine.texture.load(this.kCollector);
    }

    unload() {
        // unload the scene file and loaded resources
        engine.xml.unload(this.kSceneFile);
        engine.texture.unload(this.kPortal);
        engine.texture.unload(this.kCollector);
    }

    update() {
        // For this very simple game, let's move the first square
        let xform = this.mSqSet[0].getXform();
        let deltaX = 0.05;
        // Move right and swap over
        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            xform.incXPosBy(deltaX);
            if (xform.getXPos() > 30) { // this is the right-bound of the window
                xform.setPosition(12, 60);
            }
        }
        // Step A: test for white square movement
        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            xform.incXPosBy(-deltaX);
            if (xform.getXPos() < 11) { // this is the left-boundary
                this.next();
            }
        }
        // continuously change texture tinting
        let c = this.mSqSet[1].getColor();
        let ca = c[3] + deltaX;
        if (ca > 1) {
            ca = 0;
        }
        c[3] = ca;
    }

    next() {
        super.next();
        let nextLevel = new MyGame(); // load the next level
        nextLevel.start();
    }
}

window.onload = function () {
    engine.init("GLCanvas");
    let myGame = new MyGame();
    // new begins the game
    loop.start(myGame);
}

export default BlueLevel
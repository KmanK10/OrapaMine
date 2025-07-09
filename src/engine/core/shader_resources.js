"use strict";
import * as text from "../resources/text.js";
import * as map from "./resource_map.js";
import SimpleShader from "../shaders/simple_shader.js";
import TextureShader from "../shaders/texture_shader.js";
import SpriteShader from "../shaders/sprite_shader.js";

// Simple Shader
let kSimpleVS = "src/glsl_shaders/simple_vs.glsl"; // to VertexShader
let kSimpleFS = "src/glsl_shaders/simple_fs.glsl"; // to FragmentShader
let mConstColorShader = null;

// Texture Shader
let kTextureVS = "src/glsl_shaders/texture_vs.glsl"; // VertexShader
let kTextureFS = "src/glsl_shaders/texture_fs.glsl"; // FragmentShader

// Sprite Shader
let mTextureShader = null;
let mSpriteShader = null;

function getTextureShader() { return mTextureShader; }

function getSpriteShader() { return mSpriteShader; }

function createShaders() {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
    mTextureShader = new TextureShader(kTextureVS, kTextureFS);
    mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
}

function init() {
    let loadPromise = new Promise(
        async function (resolve) {
            await Promise.all([
                text.load(kSimpleFS),
                text.load(kSimpleVS),
                text.load(kTextureFS),
                text.load(kTextureVS)
            ]);
            resolve();
        }).then(
            function resolve() { createShaders(); }
        );

    map.pushPromise(loadPromise);
}

function getConstColorShader() { return mConstColorShader; }

function cleanUp() {
    mConstColorShader.cleanUp();
    mTextureShader.cleanUp();
    mSpriteShader.cleanUp();
    text.unload(kSimpleVS);
    text.unload(kSimpleFS);
    text.unload(kTextureVS);
    text.unload(kTextureFS);
}

export { init, cleanUp, getConstColorShader, getTextureShader, getSpriteShader }
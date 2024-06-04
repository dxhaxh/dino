import {updateGround, setupGround} from './ground.js'
import { updateDino, setupDino, getDinoRect, setDinoLose } from './dino.js';
import { updateCactus, setupCactus, getCactusRects } from './cactus.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGT = 30;
const SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startScreenElem = document.querySelector('[data-start-screen');

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keydown', handleStart, {once: true});


function setPixelToWorldScale(){
    let worldToPixelScale
    if (window.innerWidth/window.innerHeight < WORLD_WIDTH/WORLD_HEIGT){
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else{
        worldToPixelScale = window.innerHeight / WORLD_HEIGT;
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGT * worldToPixelScale}px`
}

let lastTime;
let speedScale;
let score;
function update(time){

    if (lastTime==null){
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }

    let delta = time - lastTime;

    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    if (checkGameOver()) return handleGameOver();

    lastTime = time;
    window.requestAnimationFrame(update);
}


function checkGameOver(){
    const dinoRect = getDinoRect();
    
    return getCactusRects().some(rect => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2){
    return rect1.left < rect2.right - 30 && rect1.top + 8 < rect2.bottom && rect1.right - 30 > rect2.left && rect1.bottom > rect2.top;
}


function updateSpeedScale(delta){
    speedScale += delta * SCALE_INCREASE;
}

function updateScore(delta){
    score += delta * 0.01;
    scoreElem.textContent = Math.floor(score);
}


function handleStart(){
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    setupDino();
    setupCactus();
    startScreenElem.classList.add('hide');
    window.requestAnimationFrame(update);
}

function handleGameOver(){
    setDinoLose();
    setTimeout(() => {
        document.addEventListener('keydown', handleStart, {once: true});
        startScreenElem.classList.remove('hide');
    }, 100);
}
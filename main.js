
var game = {
    points: new OmegaNum(0),
    pointmult: new OmegaNum(1),
    timestore: {
        stored: new OmegaNum(1),
        gain: new OmegaNum(2),
        spExponent: new OmegaNum(0.6)
        }
    autobuyer: {
        autobuyerPoints: new OmegaNum(0)
        }
}
let date = new Date();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function gain(n) {
    game.points = game.points.add(n).mul(game.pointmult);
}

function gainNoMult(n) {
    game.points = game.points.add(n);
}
function computeTimeStore() {
    
    game.timestore.gain = new OmegaNum(1).div(game.timestore.stored.div(new OmegaNum(6).pow(game.timestore.spExponent))).mul(game.points.pow(new OmegaNum(0.05)))
    
    game.timestore.stored = game.timestore.stored.add(game.timestore.gain);
}

function timeStoreCashout() {
    gain(game.timestore.stored)
    game.timestore.stored = new OmegaNum(1)
}

function doAutobuyers() {
    gain(game.autobuyer.autobuyerPoints)
}


setInterval(onTick, 100)
function onTick() {
    computeTimeStore()
    doAutobuyers()
    let ptsdisp = document.getElementById("pointsdisp");
    ptsdisp.textContent = "Points: " + game.points;
    let tsdisp = document.getElementById("timestorebutton");
    tsdisp.innerHTML = "Time Store<br><br>" + game.timestore.stored.floor() + " points stored<br>+" + game.timestore.gain.floor() + " per tick";
}

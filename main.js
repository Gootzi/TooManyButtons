


var one = new OmegaNum(1)
var zero = new OmegaNum(0)

var game = {
    points: new OmegaNum(0),
    pointmult: new OmegaNum(1),
    timestore: {
        stored: new OmegaNum(1),
        gain: new OmegaNum(0),
        spExponent: new OmegaNum(0.6)
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
    game.timestore.gain = one.div(game.timestore.stored.div(6).pow(game.timestore.spExponent))).mult(game.points.pow(0.05);
    game.timestore.stored.add(gain);
}

setInterval(onTick, 100)
function onTick() {

    let ptsdisp = document.getElementById("pointsdisp");
    ptsdisp.textContent = "Points: " + game.points;
    let tsdisp = document.getElementById("timestorebutton")
    tsdisp.innerHTML = "Time Store<br><br>" + game.timestore.stored + " points stored"
}

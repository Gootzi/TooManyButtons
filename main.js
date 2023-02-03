
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
    let one = new OmegaNum(1);
    let div = game.timestore.stored.div(6);
    let pow = div.pow(game.timestore.spExponent);
    let divResult = one.div(pow);
    let powResult = game.points.pow(0.05);
    let multResult = divResult.mult(powResult);
    game.timestore.Gain = multResult;
    game.timestore.stored.add(gain);
}

setInterval(onTick, 100)
function onTick() {

    let ptsdisp = document.getElementById("pointsdisp");
    ptsdisp.textContent = "Points: " + game.points;
    let tsdisp = document.getElementById("timestorebutton");
    tsdisp.innerHTML = "Time Store<br><br>" + game.timestore.stored + " points stored";
}

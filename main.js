
var game = {
    points: new OmegaNum(0),
    pointmult: new OmegaNum(1),
    timestore: {
        stored: new OmegaNum(1),
        gain: new OmegaNum(2),
        spExponent: new OmegaNum(0.6)
    },
    autobuy: {
        autobuyerPoints: {
            cost: new OmegaNum(500),
            amount: new OmegaNum(0)
        }
    }
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
    gain(game.autobuy.autobuyerPoints.amount)
}

function buyPointAutobuyer() {
    if (game.points.gte(game.autobuy.autobuyerPoints.cost)) {
        gain(game.autobuy.autobuyerPoints.cost.mul(-1))
        game.autobuy.autobuyerPoints.amount = game.autobuy.autobuyerPoints.amount.add(1)
    }
}

setInterval(onTick, 100)
function onTick() {
    computeTimeStore()
    doAutobuyers()
    let ptsdisp = document.getElementById("pointsdisp");
    ptsdisp.textContent = "Points: " + game.points.floor();
    let tsdisp = document.getElementById("timestorebutton");
    tsdisp.innerHTML = "Time Store<br><br>" + game.timestore.stored.floor() + " points stored<br>+" + game.timestore.gain.mul(new OmegaNum(1000)).floor().div(new OmegaNum(1000)) + " per tick";
    let a1disp = document.getElementById("a1button");
    a1disp.innerHTML = "Autobuy Points<br><br>" + game.autobuy.autobuyerPoints.amount + "<br>Cost: " + game.autobuy.autobuyerPoints.cost
}

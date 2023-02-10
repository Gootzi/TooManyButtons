
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
        },
        autobuyerPoints2: {
            cost: new OmegaNum(50000),
            amount: new OmegaNum(0)
        },
        autobuyerPoints3: {
            cost: new OmegaNum(5000000),
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
    game.autobuy.autobuyerPoints.amount = game.autobuy.autobuyerPoints.amount.add(game.autobuy.autobuyerPoints2.amount);
    game.autobuy.autobuyerPoints2.amount = game.autobuy.autobuyerPoints2.amount.add(game.autobuy.autobuyerPoints3.amount);
}

function buyPointAutobuyer() {
    if (game.points.gte(game.autobuy.autobuyerPoints.cost)) {
        gain(game.autobuy.autobuyerPoints.cost.mul(-1));
        game.autobuy.autobuyerPoints.amount = game.autobuy.autobuyerPoints.amount.add(1);
        game.autobuy.autobuyerPoints.cost = game.autobuy.autobuyerPoints.cost.mul(1.15);
    }
}

function buyPointAutobuyer2() {
    if (game.points.gte(game.autobuy.autobuyerPoints2.cost)) {
        gain(game.autobuy.autobuyerPoints2.cost.mul(-1));
        game.autobuy.autobuyerPoints2.amount = game.autobuy.autobuyerPoints2.amount.add(1);
        game.autobuy.autobuyerPoints2.cost = game.autobuy.autobuyerPoints2.cost.mul(1.15);
    }
}

function buyPointAutobuyer3() {
    if (game.points.gte(game.autobuy.autobuyerPoints3.cost)) {
        gain(game.autobuy.autobuyerPoints3.cost.mul(-1));
        game.autobuy.autobuyerPoints3.amount = game.autobuy.autobuyerPoints3.amount.add(1);
        game.autobuy.autobuyerPoints3.cost = game.autobuy.autobuyerPoints3.cost.mul(1.15);
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
    a1disp.innerHTML = "Pointmaker I<br><br>" + game.autobuy.autobuyerPoints.amount + "<br>Cost: " + game.autobuy.autobuyerPoints.cost.floor()
    let a2disp = document.getElementById("a2button");
    a2disp.innerHTML = "Pointmaker II<br><br>" + game.autobuy.autobuyerPoints2.amount + "<br>Cost: " + game.autobuy.autobuyerPoints2.cost.floor()
    let a3disp = document.getElementById("a3button");
    a3disp.innerHTML = "Pointmaker III<br><br>" + game.autobuy.autobuyerPoints3.amount + "<br>Cost: " + game.autobuy.autobuyerPoints3.cost.floor()
}

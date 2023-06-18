
var game = {
    points: new OmegaNum(0),
    pointmult: new OmegaNum(1),
    timestore: {
        stored: new OmegaNum(1),
        gain: new OmegaNum(2),
        spExponent: new OmegaNum(0.6)
    },
    autobuy: {
        multi: new OmegaNum(1),
        autobuyerPoints: {
            cost: new OmegaNum(500),
            amount: new OmegaNum(0),
            scaling: new OmegaNum(1.3)
        },
        autobuyerPoints2: {
            cost: new OmegaNum(50000),
            amount: new OmegaNum(0),
            scaling: new OmegaNum(2.5)
        },
        autobuyerPoints3: {
            cost: new OmegaNum(5000000),
            amount: new OmegaNum(0),
            scaling: new OmegaNum(5)
        }
    },
    upgrades: {
        mult: {
            cost: new OmegaNum(5000000),
            amount: new OmegaNum(0),
            scaling: new OmegaNum(3.5)
        }
    },
    pointling: {
        amount: new OmegaNum(0),
        cost: new OmegaNum(12500),
        scaling: new OmegaNum(1.75)
    }
}


function gain(n) {
    if (n != 0) {
        game.points = game.points.add(n.mul(game.pointmult));
    }
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
    gain(game.autobuy.autobuyerPoints.amount.mul(game.autobuy.multi.floor()));
    game.autobuy.autobuyerPoints.amount = game.autobuy.autobuyerPoints.amount.add(game.autobuy.autobuyerPoints2.amount.mul(game.autobuy.multi.floor()));
    game.autobuy.autobuyerPoints2.amount = game.autobuy.autobuyerPoints2.amount.add(game.autobuy.autobuyerPoints3.amount.mul(game.autobuy.multi.floor()));
}

function buyPointAutobuyer() {
    if (game.points.gte(game.autobuy.autobuyerPoints.cost)) {
        gainNoMult(game.autobuy.autobuyerPoints.cost.mul(-1));
        game.autobuy.autobuyerPoints.amount = game.autobuy.autobuyerPoints.amount.add(1);
        game.autobuy.autobuyerPoints.cost = game.autobuy.autobuyerPoints.cost.mul(game.autobuy.autobuyerPoints.scaling);
    }
}

function buyPointAutobuyer2() {
    if (game.points.gte(game.autobuy.autobuyerPoints2.cost)) {
        gainNoMult(game.autobuy.autobuyerPoints2.cost.mul(-1));
        game.autobuy.autobuyerPoints2.amount = game.autobuy.autobuyerPoints2.amount.add(1);
        game.autobuy.autobuyerPoints2.cost = game.autobuy.autobuyerPoints2.cost.mul(game.autobuy.autobuyerPoints.scaling);
    }
}

function buyPointAutobuyer3() {
    if (game.points.gte(game.autobuy.autobuyerPoints3.cost)) {
        gainNoMult(game.autobuy.autobuyerPoints3.cost.mul(-1));
        game.autobuy.autobuyerPoints3.amount = game.autobuy.autobuyerPoints3.amount.add(1);
        game.autobuy.autobuyerPoints3.cost = game.autobuy.autobuyerPoints3.cost.mul(game.autobuy.autobuyerPoints.scaling);
    }
}

function buyPointMult() {
    if (game.points.gte(game.upgrades.mult.cost)) {
        gainNoMult(game.upgrades.mult.cost.mul(-1));
        game.upgrades.mult.amount = game.upgrades.mult.amount.add(1);
        game.pointmult = game.pointmult.mul(2);
        game.upgrades.mult.cost = game.upgrades.mult.cost.mul(game.upgrades.mult.scaling);
    }
}

function buyPointling() {
    if (game.points.gte(game.pointling.cost)) {
        gainNoMult(game.pointling.cost.mul(-1));
        game.pointling.amount = game.pointling.amount.add(1);
        game.pointling.cost = game.pointling.cost.mul(game.pointling.scaling);
        game.autobuy.multi = game.autobuy.multi.mul(new OmegaNum(1.01).exp(game.pointling.amount));
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
    let multdisp = document.getElementById("multbutton");
    multdisp.innerHTML = "Multiply points by 2<br>Currently: " + game.pointmult + "<br>Cost: " + game.upgrades.mult.cost.floor()
    let pbdisp = document.getElementById("pbbutton");
    pbdisp.innerHTML = "Buy a Pointling<br><br>Cost: " + game.pointling.cost.floor()
    let pb1disp = document.getElementById("pointlingtips1");
    pb1disp.innerHTML = "You have " + game.pointling.amount.floor() + " pointlings, granting an x" + game.autobuy.multi +" boost to Pointmakers"
}

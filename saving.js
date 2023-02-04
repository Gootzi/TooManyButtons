function saveData() {
    localStorage.setItem("TMBsavedata",game.points.toString() + "|" + game.timestore.stored + "|" + game.autobuy.autobuyerPoints.amount + "|" + game.autobuy.autobuyerPoints.cost)
}
function loadData() {
    const splitSave = localStorage.getItem("TMBsavedata").split("|");
    game.points = new OmegaNum(splitSave[0])
    game.timestore.stored = new OmegaNum(splitSave[1])
    game.autobuy.autobuyerPoints.amount = new OmegaNum(splitSave[2])
    game.autobuy.autobuyerPoints.cost = new OmegaNum(splitSave[3])
}
function clearData() {
    localStorage.removeItem("TMBsavedata")
}
if (localStorage.getItem("TMBsavedata")) {
    loadData()
}

setInterval(saveData,5000)

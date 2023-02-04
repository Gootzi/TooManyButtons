function saveData() {
    localStorage.setItem("TMBsavedata",game.points.toString() + "|" + game.timestore.stored)
}
function loadData() {
    const splitSave = localStorage.getItem("TMBsavedata").split("|");
    game.points = new OmegaNum(splitSave[0])
    game.timestore.stored = new OmegaNum(splitSave[1])
}
function clearData() {
    localStorage.removeItem("TMBsavedata")
}
if (localStorage.getItem("TMBsavedata")) {
    loadData()
}

setInterval(saveData,5000)

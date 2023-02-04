function saveData() {
    localStorage.setItem("TMBsavedata",game.points.toString() + "|" + game.timestore.stored)
}
function loadData() {
    const splitSave = text.split("|");
    game.points = new OmegaNum(localStorage.getItem("TMBsavedata")[0])
    game.timestore.stored = new OmegaNum(localStorage.getItem("TMBsavedata")[1])
}
loadData()
setInterval(saveData,5000)

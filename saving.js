function saveData() {
    localStorage.setItem("TMBsavedata",game.points.toString())
}
function loadData() {
    game.points = new OmegaNum(localStorage.getItem("TMBsavedata"))
}
loadData()
setInterval(saveData,5000)

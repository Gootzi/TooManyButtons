function saveData() {
    var saveString = JSON.stringify(game);
    localStorage.setItem("TMBsavedata",saveString);
}
function loadData() {
    var saveString = localStorage.getItem("TMBsavedata");
    var toload = JSON.parse(saveString);
    console.log(saveString);
    var saveTable = toload;
    game = toload;
}
function clearData() {
    localStorage.removeItem("TMBsavedata");
}
function loadDataThrottled() {
  if (localStorage.getItem("TMBsavedata")) {
    loadData();
  }
}

setTimeout(loadDataThrottled,1000)

setInterval(saveData,5000)

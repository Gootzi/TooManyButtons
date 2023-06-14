function doMap(g) {
    // I hate programming this.
    var myObject = g;

    for (var key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            myObject[key] = new OmegaNum(myObject[key]);
        }
        if (typeof key === "object") {
            doMap(g)
        }
    }
}

console.log(myObject);
// { 'a': 2, 'b': 4, 'c': 6 }
}


function saveData() {
    var saveString = JSON.stringify(game);
    localStorage.setItem("TMBsavedata",saveString);
}
function loadData() {
    var saveString = localStorage.getItem("TMBsavedata");
    var toload = JSON.parse(saveString);
    console.log(saveString);
    var saveTable = doMap(toload);
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

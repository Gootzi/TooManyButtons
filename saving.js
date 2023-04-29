function reconstructArray(flattened, ref) {
  let i = 0;
  const result = ref.map(item => {
    if (Array.isArray(item)) {
      return reconstructArray(flattened, item);
    } else {
      return flattened[i++];
    }
  });
  return result;
}



function saveData() {
    var saveString = game.flat(Infinity).map(x => x.toString()).join('|');
    localStorage.setItem("TMBsavedata",saveString);
}
function loadData() {
    var saveString = localStorage.getItem("TMBsavedata");
    var flattened = saveString.split("|").map(x => parseFloat(x));
    console.log(saveString)
    console.log(saveString.split("|"));
    var saveTable = reconstructArray(flattened, game);
    const splitSave = saveTable.map(x => new OmegaNum(x));
    game = splitSave;
}
function clearData() {
    localStorage.removeItem("TMBsavedata");
}
if (localStorage.getItem("TMBsavedata")) {
    loadData();
}

setInterval(saveData,5000)

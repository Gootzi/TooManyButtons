// FlattenArray courtesy of ChatGPT

function flattenArray(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// UpdateArrayValues courtesy of ChatGPT

function updateArrayValues(arr, flatArr) {
  var flatIndex = 0;
  function traverseArray(node) {
    if (Array.isArray(node)) {
      return node.map(traverseArray);
    } else {
      var value = flatArr[flatIndex];
      flatIndex++;
      return value;
    }
  }
  return traverseArray(arr);
}



function saveData() {
    var saveString = flattenArray(game).map(x => x.toString()).join('|')
    localStorage.setItem("TMBsavedata",saveString)
}
function loadData() {
    
    var saveTable = updateArrayValues(game,saveString.split("|"))
    const splitSave = localStorage.getItem("TMBsavedata").split("|");
}
function clearData() {
    localStorage.removeItem("TMBsavedata")
}
if (localStorage.getItem("TMBsavedata")) {
    loadData()
}

setInterval(saveData,5000)

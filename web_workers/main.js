var addRow = function (drinker, bottles) {
  var tbody = document.getElementsByTagName("tbody")[0];
  var row = tbody.insertRow(tbody.rows.length);
  row.insertCell(0).innerHTML = drinker;
  row.insertCell(1).innerHTML = bottles;
};

var logBottlesFor = function (drinker) {
  return function (event) {
    addRow(drinker, event.data);
  };
};

var amanda = new Worker("worker.js");
var awomanda = new Worker("worker.js");

amanda.onmessage = logBottlesFor("Amanda");
awomanda.onmessage = logBottlesFor("Awomanda");

amanda.postMessage("drink!");
awomanda.postMessage("drink!")



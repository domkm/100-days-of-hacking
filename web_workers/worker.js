function drinkNBottlesOfBeer (n) {
  var time = Math.random() * 1000;
  var drink = function () {
    if (n > 0) {
      drinkNBottlesOfBeer(n - 1);
    };
    postMessage(n);
  };
  setTimeout(drink, time);
};

onmessage = function (event) {
  if (event.data === "drink!") {
    drinkNBottlesOfBeer(99);
  };
};

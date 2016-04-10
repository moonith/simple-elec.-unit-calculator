// input
var resistance = document.getElementById("resistanceInput");
var reactance = document.getElementById("reactanceInput");
var impedance = document.getElementById("impedanceInput");
var angle = document.getElementById("angleInput");
// controls
var countUpButton = document.getElementById("countUp");
var countDownButton = document.getElementById("countDown");

countUpButton.addEventListener('click', countUp);
countDownButton.addEventListener('click', countDown);
resistance.addEventListener("change", typeCheck);
reactance.addEventListener("change", typeCheck);

function typeCheck(event) {
    // accepts only numbers and number with "."
    var inputValidationRegExp = /(?: |^[-+]?)\d*\.?\d+(?: |$)/;
    if (!inputValidationRegExp.test(event.target.value)) {
      alert("Błąd, zły format wprowadzonych danych. Tylko cyfry i \".\". Sprobuj ponownie.");
      resetInputValues();
    }
}
function countDown () {
  var floatResistance = parseFloat(resistance.value),
      floatReactance = parseFloat(reactance.value),
      temp,
      impedance,
      angle;
  if (isNaN(floatResistance) || isNaN(floatReactance)) {
    return;
  }
  impedance = Math.sqrt(Math.pow(floatResistance, 2) + Math.pow(floatReactance, 2));
  temp = convertToDeg(Math.atan(floatReactance / floatResistance));
  if (floatResistance < 0 & floatReactance < 0) {
    angle = temp - 180;
  } else if (floatResistance < 0 & floatReactance > 0) {
    angle = temp + 180;
  } else if (floatResistance > 0) {
    angle = temp;
  }

  updateView("down", {impedance, angle});
}

function countUp () {
  var floatImpedance = parseFloat(impedance.value),
      floatAngle = convertToRad(parseFloat(angle.value)),
      resistance,
      reactance;
  if (isNaN(floatImpedance) || isNaN(floatAngle)) {
    return;
  }
  resistance = floatImpedance * Math.cos(floatAngle)
  reactance = floatImpedance * Math.sin(floatAngle)
  updateView("up", {resistance, reactance});
}

function updateView (direction, value) {
  switch (direction) {
    case "up":
      resistance.value = Math.round(value.resistance * 1000) / 1000;
      reactance.value = Math.round(value.reactance * 1000) / 1000;
      resistance.style.backgroundColor = "grey";
      reactance.style.backgroundColor = "grey";
      impedance.style.backgroundColor = "";
      angle.style.backgroundColor = "";
      break;
    case "down":
      impedance.value = Math.round(value.impedance * 1000) / 1000;
      angle.value = Math.round(value.angle * 1000) / 1000;
      resistance.style.backgroundColor = "";
      reactance.style.backgroundColor = "";
      impedance.style.backgroundColor = "grey";
      angle.style.backgroundColor = "grey";
      break;
  }
}

function resetInputValues() {
  resistance.value = "";
  reactance.value = "";
  impedance.value = "";
  angle.value = "";
}

function convertToDeg(radians) {
  return radians * (180 / Math.PI);
}
function convertToRad(deg) {
  return deg / (180 / Math.PI);
}

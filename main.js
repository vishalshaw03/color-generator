const box = document.getElementById("box");
const colorCode = document.getElementById("color-code");
const rgbCode = document.getElementById("rgb-code");

const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
const opacitySlider = document.getElementById("opacity");

const redValue = document.getElementById("red-value");
const greenValue = document.getElementById("green-value");
const blueValue = document.getElementById("blue-value");
const opacityValue = document.getElementById("opacity-value");

const opacityCheckBox = document.getElementById("opacity-check");

const inputHex = document.getElementById("hex-code-input");
const checkHexBtn = document.getElementById("check-hex-btn");

redSlider.oninput = function () {
  changeSlider(this, this.value, "red");
};

greenSlider.oninput = function () {
  changeSlider(this, this.value, "green");
};

blueSlider.oninput = function () {
  changeSlider(this, this.value, "blue");
};

opacitySlider.oninput = function () {
  changeSlider(this, this.value, "gray");

  const v = parseFloat(this.value / 255).toFixed(2);
  opacityValue.value = v;
};

function changeSlider(el, value, color, update) {
  const percent = (value / 255) * 100;
  el.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${percent}%, #fff ${
    percent + 0.5
  }%, white 100%)`;

  const colorValue = Math.ceil(value);
  switch (color) {
    case "red":
      redValue.value = colorValue;
      break;

    case "green":
      greenValue.value = colorValue;
      break;

    case "blue":
      blueValue.value = colorValue;
      break;
  }

  if (update !== false) changeBoxColor();
}

redValue.oninput = function () {
  redSlider.value = this.value;
  changeSlider(redSlider, this.value, "red");
};

greenValue.oninput = function () {
  greenSlider.value = this.value;
  changeSlider(greenSlider, this.value, "green");
};

blueValue.oninput = function () {
  blueSlider.value = this.value;
  changeSlider(blueSlider, this.value, "blue");
};

opacityValue.oninput = function () {
  const v = parseFloat(this.value).toFixed(2);

  if (v >= 0 && v <= 1) {
    opacitySlider.value = v * 255;
    changeSlider(opacitySlider, v * 255, "gray");
  }
};

opacityCheckBox.oninput = function () {
  opacitySlider.disabled = !this.checked;
  opacityValue.disabled = !this.checked;
};

function changeBoxColor() {
  const r = getHex(redValue.value).toUpperCase();
  const g = getHex(greenValue.value).toUpperCase();
  const b = getHex(blueValue.value).toUpperCase();
  const a = getHex(opacitySlider.value).toUpperCase();

  let op = opacityValue.value;
  if (a === "FF" || a === "ff") op = 1;
  else if (a === "00") op = 0;

  const showOpacity = opacityCheckBox.checked;

  const hexCode = `#${r}${g}${b}${showOpacity ? a : ""}`;

  box.style.backgroundColor = hexCode;
  colorCode.innerText = hexCode;
  rgbCode.innerText = `${showOpacity ? "rgba" : "rgb"}(${redValue.value}, ${
    greenValue.value
  }, ${blueValue.value}${showOpacity ? ", " + op : ""})`;

  // console.log(hexCode);
}

function getHex(value) {
  let hex = Number(value).toString(16);

  while (hex.length < 2) {
    hex = "0" + hex;
  }

  return hex;
}

checkHexBtn.addEventListener("click", function () {
  const hex = inputHex.value;

  const [r, g, b, alpha] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));

  if (!r || !g || !b) {
    // console.log("invalid");
    inputHex.value = "";
    alert("Invalid Hex-code! Please provide a valid hex-code.");
    return;
  }

  redSlider.value = r;
  greenSlider.value = g;
  blueSlider.value = b;

  changeSlider(redSlider, r, "red", false);
  changeSlider(greenSlider, g, "green", false);
  changeSlider(blueSlider, b, "blue", false);

  if (alpha !== undefined && alpha !== null) {
    if (!opacityCheckBox.checked) {
      opacityCheckBox.checked = true;
      opacitySlider.disabled = false;
      opacityValue.disabled = false;
    }
    opacitySlider.value = alpha;
    opacityValue.value = parseFloat(alpha / 255).toFixed(2);
    changeSlider(opacitySlider, alpha, "gray", false);
  }

  changeBoxColor();
  // console.log(r, g, b, alpha);
});

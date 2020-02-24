const inputNumber = document.querySelectorAll(".controller__input");
const result = document.getElementById("result");
const box = document.getElementById("box");

function updateResult(value) {
  const setValue = `${value["border-top-left-radius"]} ${value["border-top-right-radius"]} ${value["border-bottom-right-radius"]} ${value["border-bottom-left-radius"]}`;
  result.innerText = `
    -webkit-border-radius: ${setValue}
    -moz-border-radius: ${setValue}
    border-radius: ${setValue} `;
}

updateResult(getComputedStyle(box));

function setBorder(position, value) {
  const constructStyle = `border${position}Radius`;
  box.style[constructStyle] = `${value}px`;
  updateResult(getComputedStyle(box));
}

function validateOnlyNumbers(evt) {
  let key = evt.keyCode || evt.which;
  key = String.fromCharCode(key);
  const regex = /[0-9]|\./;
  if (!regex.test(key)) {
    evt.returnValue = false;
    if (evt.preventDefault) {
      evt.preventDefault();
      return true;
    }
  }
}

inputNumber.forEach(function(elem) {
  elem.addEventListener("keypress", function(e) {
    validateOnlyNumbers(e);
  });

  elem.addEventListener("focus", function(e) {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  });

  elem.addEventListener("input", function(e) {
    if (!e.target.value) {
      e.target.value = "0";
      setBorder(e.target.id, e.target.value);
      return;
    }
    if (validateOnlyNumbers(e)) {
      setBorder(e.target.id, e.target.value);
    }
  });
});

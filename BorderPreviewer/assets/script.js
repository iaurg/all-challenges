const inputNumber = document.querySelectorAll(".controller__input");
const result = document.getElementById("result");
const box = document.getElementById("box");
const allEqual = document.getElementsByName("equal");
const equalBorder = document.getElementById("equalBorder");

function reset() {
  inputNumber.forEach(function(elem) {
    elem.value = "0";
  });
  equalBorder.value = "0";
  result.innerText = "Border Radius Generator 😉";
  box.style.borderRadius = "0";
}

allEqual[0].checked = false;
window.onload = reset;

function updateResult(value) {
  let setValue = 0;
  if (allEqual[0].checked) {
    setValue = `${equalBorder.value}px`;
  } else {
    setValue = `${value["border-top-left-radius"]} ${value["border-top-right-radius"]} ${value["border-bottom-right-radius"]} ${value["border-bottom-left-radius"]}`;
  }
  result.innerText = `-webkit-border-radius: ${setValue}; -moz-border-radius: ${setValue}; border-radius: ${setValue};`;
}

function setBorder(position, value) {
  if (position === "equalBorder") {
    box.style.borderRadius = `${value}px`;
  } else {
    const constructStyle = `border${position}Radius`;
    box.style[constructStyle] = `${value}px`;
  }
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

function onFocus(e) {
  if (e.target.value === "0") {
    e.target.value = "";
  }
}

function onKeypress(e) {
  validateOnlyNumbers(e);
}

function onInput(e) {
  if (!e.target.value) {
    e.target.value = "";
    setBorder(e.target.id, e.target.value);
    return;
  }
  if (validateOnlyNumbers(e)) {
    setBorder(e.target.id, e.target.value);
  }
}

inputNumber.forEach(function(elem) {
  elem.addEventListener("keypress", onKeypress);

  elem.addEventListener("focus", onFocus);

  elem.addEventListener("input", onInput);
});

/*Equal borders*/
allEqual[0].addEventListener("change", function(e) {
  inputNumber.forEach(function(input) {
    if (e.target.checked) {
      input.style.display = "none";
      equalBorder.style.display = "block";
    } else {
      input.style.display = "block";
      equalBorder.style.display = "none";
    }
  });
  reset();
});

equalBorder.addEventListener("keypress", onKeypress);

equalBorder.addEventListener("focus", onFocus);

equalBorder.addEventListener("input", onInput);

/*Copy result*/

function copyToClipBoard() {
  result.select();
  document.execCommand("copy");
  const alert = document.getElementById("alertCopy");
  alert.classList.add("showAlert");
  setTimeout(function() {
    alert.classList.remove("showAlert");
  }, 1000);
}

result.addEventListener("click", copyToClipBoard);

const binaryInput = document.getElementById("binaryInput");
const convertButton = document.getElementById("convertButton");
const resultConverted = document.getElementById("resultConverted");
const binaryRegex = /[0-1]{1,}$/;

const converteToBinary = value => parseInt(value, 2);
const fillResult = () => {
  if (binaryInput.value > 0) {
    resultConverted.innerHTML = converteToBinary(binaryInput.value);
    resultConverted.classList.add("show");
    return;
  }
  Swal.fire({
    title: "Info!",
    text: "Fill the input!",
    icon: "info",
    confirmButtonText: "Ok"
  });
};

binaryInput.addEventListener("paste", function(e) {
  const compareRegexPaste = binaryRegex.exec(
    e.clipboardData.getData("text/plain")
  );
  if (compareRegexPaste === null) {
    e.preventDefault();
    Swal.fire({
      title: "Error!",
      text: "Paste only binary!",
      icon: "error",
      confirmButtonText: "Ok"
    });
  }
});

binaryInput.addEventListener("keypress", function(e) {
  if (e.charCode === 13) {
    fillResult();
    return;
  }

  if (e.charCode !== 48 && e.charCode !== 49) {
    e.returnValue = false;
    if (e.preventDefault) e.preventDefault();
    Swal.fire({
      title: "Error!",
      text: "Only binary!",
      icon: "error",
      confirmButtonText: "Ok"
    });
  }
});

convertButton.addEventListener("click", function() {
  fillResult();
});

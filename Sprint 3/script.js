

//DECLAR
const cardCVC = document.querySelector(".cvc span");
const cardNumber = document.querySelector(".card-Number");
const cardName = document.querySelector(".cardholder-name");
const cardExpDate = document.querySelector(".exp-date");
const form = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#card-number");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const inputCVC = document.querySelector("#cvc");

const infoErr = document.querySelectorAll(".info-err");
const complete = document.querySelector(".complete");

const showError = (input, arrInfoErr, message) => {
  input.classList.add("input-err");
  infoErr[arrInfoErr].classList.add("d-block");
  infoErr[arrInfoErr].textContent = message;
};

const hideError = (input, arrInfoErr) => {
  input.classList.remove("input-err");
  infoErr[arrInfoErr].classList.remove("d-block");
};

let inputNameValue;
let inputNumberValue;
let inputMonthValue = "00";
let inputYearValue = "00";
let inputCVCValue;

const validateInput = (input, arrInfoErr, wordLength) => {
  if (!wordLength) {
    if (!input.value) {
      showError(input, arrInfoErr, "No puede estar vacio");
    } else {
      hideError(input, arrInfoErr);
      inputNameValue = input.value;
    }
  } else {
    if (!input.value) {
      showError(input, arrInfoErr, "No puede estar vacio");
    } else if (!/^\d+$/.test(input.value)) { // !/^\d+$/.test(input.value)) lo saque de chatgpt
      showError(input, arrInfoErr, "Solo numeros");
    } else if (input.value.length < wordLength) {
      if (wordLength > 3) {
        showError(input, arrInfoErr, "EL numero de la tarjeta debe tener 16 numeros");
      }
    } else if (parseInt(inputMonthValue) > 12) {
      showError(input, arrInfoErr, "El mes no puede ser mayor a 12");
    } 
    }
  }


  inputName.addEventListener("input", (e) => {
    e.preventDefault();
  
    inputNameValue = e.target.value;
    cardName.textContent = inputNameValue;
  });
  
  inputNumber.addEventListener("input", (e) => {
    e.preventDefault();
  
    let formatText = e.target.value;
    formatText = formatText.substring(0, 19);
    formatText = formatText
      .replace(/\s/g, "")
      .replace(new RegExp(`(.{${4}})`, "g"), "$1 ")
    e.target.value = formatText;
  
    inputNumberValue = e.target.value;
    cardNumber.textContent = inputNumberValue;
  
  });
  
  const deleteSpace = (input) => {
    if (/\s/.test(input.value)) {
      let formatText = input.value.replace(/\s/g, "");
  
      input.value = formatText;
    }
  };
  
  inputMonth.addEventListener("input", (e) => {
    e.preventDefault();
  
    deleteSpace(inputMonth);
    inputMonthValue = e.target.value;
    cardExpDate.textContent = inputMonthValue + "/" + inputYearValue;
  });
  
  inputYear.addEventListener("input", (e) => {
    e.preventDefault();
  
    deleteSpace(inputYear);
    inputYearValue = e.target.value;
    cardExpDate.textContent = inputMonthValue + "/" + inputYearValue;
  });
  
  inputCVC.addEventListener("input", (e) => {
    e.preventDefault();
  
    deleteSpace(inputCVC);
    inputCVCValue = e.target.value;
    cardCVC.textContent = inputCVCValue;
  });
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    inputNameValue = "";
    inputNumberValue = "";
    inputMonthValue = "00";
    inputYearValue = "00";
    inputCVCValue = "";
  
    validateInput(inputName, 0);
    validateInput(inputNumber, 1, 19);
    validateInput(inputMonth, 2, 2);
    validateInput(inputYear, 2, 2);
    validateInput(inputCVC, 3, 3);
  })
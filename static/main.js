let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let saveButton = document.getElementById("save");
let closeButton = document.getElementById("close");
let settingsButton = document.getElementById("settings");
let settingsContainer = document.getElementById("settingsContainer");
let validationMessages = document.getElementById("validationMessages")

let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

const updateTimer = () => {

 if (active == "focus") {
  pauseTimer();
  minCount = defaultFocusTime - 1;
  count = 59;
  if (minCount < 10) {
    time.textContent = '0' + `${minCount + 1}:00`;
  }
  else {
    time.textContent = `${minCount + 1}:00`;
  }
 }

 else if (active == "short") {
  pauseTimer();
  minCount = defaultShortBreakTime - 1;
  count = 59;
  if (minCount < 10) {
    time.textContent = '0' + `${minCount + 1}:00`;
  }
  else {
    time.textContent = `${minCount + 1}:00`;
  }
 }

 else if (active = "long") {
  pauseTimer();
  minCount = defaultLongBreakTime - 1;
  count = 59;
  if (minCount < 10) {
    time.textContent = '0' + `${minCount + 1}:00`;
  }
  else {
    time.textContent = `${minCount + 1}:00`;
  }
 }

} 

reset.addEventListener(
  "click", () => {
    pauseTimer();
    updateTimer();
});

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

// Default durations
let defaultFocusTime = 25;
let defaultShortBreakTime = 5;
let defaultLongBreakTime = 15;

// Function to update settings input values
const updateSettingsInputs = () => {
  document.getElementById("focusTime").value = defaultFocusTime;
  document.getElementById("shortBreakTime").value = defaultShortBreakTime;
  document.getElementById("longBreakTime").value = defaultLongBreakTime;

};

focusButton.addEventListener("click", () => {
  active = "focus"
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = defaultFocusTime - 1;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = defaultShortBreakTime - 1;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = defaultLongBreakTime - 1;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

let visibility = false;

settingsButton.addEventListener("click", () => {
  active = "settings";
  removeFocus();
  settingsButton.classList.add("btn-focus");

  if (visibility === false) {
    settingsContainer.classList.remove('hide');
    settingsContainer.classList.add('show');
    updateSettingsInputs();
    visibility = true;
  } 
  
  else {
    settingsContainer.classList.add('hide');
    settingsContainer.classList.remove('show');
    visibility = false;
  }
});

closeButton.addEventListener("click", () => {
  settingsContainer.classList.add('hide');
  settingsContainer.classList.remove('show');
  validationMessages.classList.add('hide');
  validationMessages.classList.remove('show');
  visibility = false;
});


saveButton.addEventListener("click", () => {

  let newFocusTime = parseInt(document.getElementById("focusTime").value);
  let newShortBreakTime = parseInt(document.getElementById("shortBreakTime").value);
  let newLongBreakTime = parseInt(document.getElementById("longBreakTime").value);

  // Validate input values
  if (newFocusTime <= 0 || isNaN(newFocusTime)) {
    document.getElementById("validationMessages").textContent = "Focus time should be greater than 0 and must be a number.";
    validationMessages.classList.remove('hide');
    validationMessages.classList.add('show');
    return;
  }
  if (newShortBreakTime <= 0 || isNaN(newShortBreakTime)) {
    document.getElementById("validationMessages").textContent = "Short break time should be greater than 0 and must be a number.";
    validationMessages.classList.remove('hide');
    validationMessages.classList.add('show');
    return;
  }
  if (newLongBreakTime <= 0 || isNaN(newLongBreakTime)) {
    document.getElementById("validationMessages").textContent = "Long break time should be greater than 0 and must be a number.";
    validationMessages.classList.remove('hide');
    validationMessages.classList.add('show');
    return;
  }

  // Clear validation messages if all inputs are valid
  document.getElementById("validationMessages").textContent = "";

  defaultFocusTime = parseInt(document.getElementById("focusTime").value) || defaultFocusTime;
  defaultShortBreakTime = parseInt(document.getElementById("shortBreakTime").value) || defaultShortBreakTime;
  defaultLongBreakTime = parseInt(document.getElementById("longBreakTime").value) || defaultLongBreakTime;

  updateTimer();
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});

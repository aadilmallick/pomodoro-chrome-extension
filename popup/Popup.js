import { setSync, getSync, setLocal, getLocal } from "../helper.js";

const timeDisplay = document.querySelector(".time-display");
const addTaskbutton = document.querySelector("#add-task");
const taskContainer = document.querySelector(".task-container");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
let tasks = [];

async function updateTime() {
  const { timer, workDuration } = await getLocal(["timer", "workDuration"]);
  const minutes = `${workDuration - Math.ceil(timer / 60)}`.padStart(2, "0");
  let seconds = `${60 - (timer % 60)}`.padStart(2, "0");
  console.log(seconds);
  if (seconds == 60) {
    seconds = "00";
  }
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

updateTime();
setInterval(updateTime, 1000);

chrome.storage.sync.get(["tasks"], (result) => {
  tasks = result.tasks || [];
  renderTasks();
});

chrome.storage.local.get(["isRunning"], (result) => {
  if (result.isRunning) {
    startButton.textContent = "pause";
  } else {
    startButton.textContent = "start";
  }
});

function renderTask(taskNum) {
  const div = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNum];
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.type = "button";
  deleteBtn.addEventListener("click", (e) => {
    deleteTask();
  });

  div.appendChild(text);
  div.appendChild(deleteBtn);
  taskContainer.appendChild(div);
}

function renderTasks() {
  taskContainer.textContent = "";
  tasks.forEach((task, taskIndex) => {
    renderTask(taskIndex);
  });
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

async function saveTasks() {
  await setSync({ tasks });
}

addTaskbutton.addEventListener("click", (e) => {
  addTask();
});

startButton.addEventListener("click", async () => {
  const { isRunning } = await getLocal(["isRunning"]);
  await setLocal({ isRunning: !isRunning });
  console.log(isRunning);
  const newvar = !isRunning;
  if (isRunning === true) {
    startButton.textContent = "start";
  }
  if (isRunning === false) {
    startButton.textContent = "pause";
  }
});

resetButton.addEventListener("click", async () => {
  await setLocal({ timer: 0, isRunning: false });
  startButton.textContent = "start";
});

import { getLocal, setLocal, getSync, setSync } from "../helper.js";

const timeOption = document.getElementById("time-options");
const saveBtn = document.getElementById("save");

timeOption.addEventListener("change", (e) => {
  const val = e.target.value;
  if (val < 10 || val > 40) {
    timeOption.value = 25;
  }
});

saveBtn.addEventListener("click", async () => {
  await setLocal({
    workDuration: timeOption.value,
    timer: 0,
    isRunning: false,
  });
});

chrome.storage.local.get(["workDuration"], (result) => {
  const workDuration = result.workDuration || 25;
  timeOption.value = workDuration;
});

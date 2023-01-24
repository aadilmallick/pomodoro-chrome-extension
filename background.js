import { setLocal, getLocal } from "./helper.js";

// TODO add periodInMinutes : 1 functionality for release to app store
chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    setTime();
  }
});

async function setInit() {
  const result = await getLocal(["timer", "isRunning", "workDuration"]);
  const timer = result.timer || 0;
  const isRunning = result.isRunning || false;
  const workDuration = result.workDuration || 25;
  await setLocal({ timer, isRunning, workDuration });
}

async function setTime() {
  const { timer, isRunning, workDuration } = await getLocal([
    "timer",
    "isRunning",
    "workDuration",
  ]);
  console.log(timer);
  if (isRunning) {
    await setLocal({ timer: timer + 1 });
    if (timer === workDuration * 60) {
      chrome.notifications.create("pomodoro", {
        type: "basic",
        iconUrl: "images/icon.png",
        title: "Pomodoro Timer",
        message: "Timer Over",
      });
    }
  }
}

setInit();

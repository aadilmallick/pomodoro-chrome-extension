function getSync(keylist) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(keylist, (result) => {
      resolve(result);

      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
    });
  });
}

function setSync(obj) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(obj, () => {
      resolve();

      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
    });
  });
}

function getLocal(keylist) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keylist, (result) => {
      resolve(result);

      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
    });
  });
}

function setLocal(obj) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(obj, () => {
      resolve();

      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
    });
  });
}

export { setLocal, getLocal, setSync, getSync };

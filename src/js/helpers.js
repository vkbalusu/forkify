import { TIMEOUT_SECS } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECS)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`Error ${data.message} ${data.status}`);
    return data;
  } catch (error) {
    // alert(err);
    throw error;
  }
};

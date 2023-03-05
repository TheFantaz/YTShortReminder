/**
 * Plays audio files from extension service workers
 * @param {string} source - path of the audio file
 * @param {number} volume - volume of the playback
 */
async function playSound(source = 'sound-1.wav', volume = 1) {
  await createOffscreen();
  await chrome.runtime.sendMessage({ play: { source, volume } });
}

// Create the offscreen document if it doesn't already exist
async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
      url: 'soundHandler/offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'testing' // details for using the API
  });
}

chrome.webNavigation.onHistoryStateUpdated.addListener(main)

function getVal(value){
  return new Promise(resolve => {
    chrome.storage.local.get(value, function(result){
      const val = result[value] ? result[value] : null;
      resolve(val);
    });
  });
}
function saveData(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      // Callback function for when the operation is complete
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

async function main(details){


  

  let activeTab = String(details.url)

  if(activeTab == undefined || activeTab == null) return

  if (! String(activeTab).includes("https://www.youtube.com/shorts")){
    await saveData('urlTimeOld', null)
    await saveData('time', 0)
    await saveData("lastTime",0)
    console.log(await getVal("lastTime"))
    return
  }
  if(await getVal('prevURL') == activeTab) return
  await saveData('prevURL',activeTab)



  var currentTime = new Date()
  var oldTime = await getVal("urlTimeOld")

  

  if(oldTime == null){
    await saveData('urlTimeOld', String(currentTime))

    return
  }
  oldTime = new Date(Date.parse(oldTime))

  //This means that we are in a YT chain

  let mins = (Math.abs(currentTime - oldTime)) / 1000/ 60 

  let timeString = Math.floor(mins) + ":" + (Math.floor((mins % 1) * 60) < 10 ? "0" : "") + Math.floor((mins % 1) * 60);

  let selectedTime = ( await getVal("selectedTime")) || 1

  console.log(mins,(await getVal("lastTime")), selectedTime)

  if( Math.floor(mins) - (await getVal("lastTime")||0 ) >= selectedTime && (await getVal("time")||"0").split(':')[0] != Math.floor(mins) && await getVal('enabled')){
    chrome.storage.local.set({'lastTime':mins})
    chrome.windows.create({
      type: "popup",
      url: "popup.html",
      width: 400,
      height: 300
    });
  }
  
  chrome.storage.local.set({'time':timeString})

}
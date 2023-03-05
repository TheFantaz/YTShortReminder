document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get('time', function(data) {
    var time = data.time || "0:00";
    var timeSpan = document.getElementById('time');
    timeSpan.textContent = time;
  });
});
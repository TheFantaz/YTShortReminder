document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the last selected option from chrome.storage.local
    chrome.storage.local.get('selectedTime', function(data) {
        if (data.selectedTime) {
            document.getElementById('inter').value = data.selectedTime;
        }
    });
  
    // Add an event listener to the select tag
    document.getElementById('inter').addEventListener('change', function() {
      // Save the selected option to chrome.storage.local
        chrome.storage.local.set({'selectedTime': this.value});
    });
  

  });
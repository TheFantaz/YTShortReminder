document.addEventListener('DOMContentLoaded', function() {
  var toggleElement = document.getElementById('toggle');
    
    chrome.storage.local.get("enabled", function(data) {
        toggleElement.checked = data.enabled || false;
    });
    
    toggleElement.addEventListener('change', function() {
      var toggleValue = this.checked;
      chrome.storage.local.set({ "enabled": toggleValue });
    });

  });
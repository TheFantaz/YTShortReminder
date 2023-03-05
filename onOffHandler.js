document.addEventListener('DOMContentLoaded'), function() {
    chrome.storage.local.get("enabled", function(data) {
        var myToggleValue = data.myToggleValue;
      
        // Set the checked attribute of the input element based on the saved value
        var toggle = document.getElementById("toggle");
        toggle.checked = myToggleValue;
      });
}
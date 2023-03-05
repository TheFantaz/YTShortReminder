
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById("submitBtn").addEventListener("click", saveData);

    

  chrome.storage.local.get("selectedTime", function(data) {
    document.getElementById("myInput").value = data.selectedTime || 5
  });

  function saveData() {
      // Retrieve the value of the textbox
    const inputValue = document.getElementById("myInput").value;
    
      // Save the value to Chrome storage
    chrome.storage.local.set({ "selectedTime": inputValue }, function() {
    });
  }
})
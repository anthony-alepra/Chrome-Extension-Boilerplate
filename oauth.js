window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
      chrome.identity.getAuthToken({ interactive: true }, function(token) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
  
        // Store the token in Chrome storage
        chrome.storage.local.set({ 'access_token': token }, function() {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          } else {
            console.log('Token stored successfully.');
          }
        });
  
      });
    });
  };
  
// Define the 'init' object outside of any function so it's accessible globally
const init = {
    method: 'GET',
    async: true,
    headers: {
      Authorization: '', // Initialize to an empty string, it will be updated later
      'Content-Type': 'application/json'
    },
    'contentType': 'json'
  };
  
  function makeRequest(functionToCall) {
    // Retrieve the token from local storage
    chrome.storage.local.get('access_token', function(result) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
  
      const token = result.access_token;
  
      if (token) {
        // Update the Authorization header with the token
        init.headers.Authorization = 'Bearer ' + token;
  
        // Perform your API request or other actions here using the updated 'init' object
        functionToCall();
      } else {
        console.error('Access token not found in local storage.');
      }
    });
  }
  
  function getThreads() {
    fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/threads',
      init
    )
      .then((response) => response.json())
      .then(function(data) {
        console.log(data);
      });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // Your code here, including the event listener setup
    document.getElementById('getThreadsButton').addEventListener('click', function() {
      // Your function for handling the "Get Threads" button click
      makeRequest(getThreads);
    });
  });
  
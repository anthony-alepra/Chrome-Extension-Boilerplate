let isGmail = false;

function checkGmail() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        if (tabs && tabs[0] && tabs[0].url) {
          const url = tabs[0].url;
          isGmail = /^https:\/\/mail\.google\.com\//.test(url);
        }
        resolve(isGmail);
      });
    }, 1000);
  });
}

function loadApp() {
  fetch('app.html')
    .then(response => response.text())
    .then(html => {
      // Inject the HTML content into an element on the target page
      document.getElementById('app').innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
}

checkGmail()
  .then((result) => {
    if(result == true) {
        document.getElementById("title").innerHTML = "Co-Pilot is Active";
        loadApp();
    }
    else {
        document.getElementById("title").innerHTML = "Navigate to Gmail to use Co-Pilot!";
    }
  })
  .catch((err) => {
    console.log(err);
  });
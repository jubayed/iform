function previewLoader() {
    return new Promise((resolve, reject) => {
      var addonUrl = `${window.location.origin}/addons/bootstrap.js`;
      window._run_addon = undefined;
  
      fetch(addonUrl)
        .then(response => {
          if (!response.ok) {
            // If the response is not okay (HTTP status not 200), set an error flag or handle it accordingly
            // In this example, it sets an error flag using setAddonBoken(true)
            reject("401", addonUrl, 'Invalid addon file or script.');
            return null;
          }else{

            return response.text(); // Retrieve the response body as text
          }
          
        })
        .then(scriptContent => {
          const regex = /var\s+\n?__addon__/;
  
          if (scriptContent === null || (scriptContent && regex.exec(scriptContent) === null)) {
            // If the script content is null or doesn't contain the expected variable, reject the Promise
            reject("404", addonUrl, 'Framework or platform not found. Please create a new JS page.');
          } else {
            // If the script content is valid, resolve the Promise after a delay (simulating some operations)
            setTimeout(() => {
              resolve(scriptContent ? scriptContent : null);
            }, 2000);
          }
        })
        .catch(error => {
          // Catch any errors during the fetch or processing
          reject("404", addonUrl, `Invalid js content. window._run_addon is undefined\nurl=${addonUrl}`);
        });
    });
  }
  
  export default previewLoader;
  
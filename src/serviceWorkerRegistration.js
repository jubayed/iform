import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('./service-worker.js');
  
  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      // Perform any update-related actions here
      // For example, display a toast message or refresh the page
      console.log('Service worker has been updated');
    } else {
      // Perform any first-time installation actions here
      console.log('Service worker has been installed');
    }
  });
  
  wb.register().then((registration) => {
    // Registration was successful
    console.log('Service worker has been registered');
  }).catch((error) => {
    // Registration failed
    console.error('Error registering service worker:', error);
  });
}

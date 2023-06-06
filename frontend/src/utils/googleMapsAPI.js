export const loadGoogleMapsAPI = () => {
    return new Promise((resolve, reject) => {
      // Check if the Google Maps API is already loaded
      if (window.google && window.google.maps) {
        resolve();
        return;
      }
  
      // Create a script element to load the Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFS39N6iyEeL-kC9WeivgCHeq0V7lgst0&libraries=places`;
      script.async = true;
      script.defer = true;
  
      // Set up callback function for API loaded event
      script.onload = () => {
        resolve();
      };
  
      // Set up callback function for API loading error
      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API'));
      };
  
      // Append the script element to the document body
      document.body.appendChild(script);
    });
  };
  
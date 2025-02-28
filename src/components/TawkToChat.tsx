
import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

const TawkToChat = () => {
  useEffect(() => {
    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_TAWK_TO_PROPERTY_ID/YOUR_TAWK_TO_WIDGET_ID';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup
    return () => {
      // Remove script from DOM
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      
      // Remove Tawk_API from window
      if (window.Tawk_API) {
        if (window.Tawk_API.hideWidget) window.Tawk_API.hideWidget();
        delete window.Tawk_API;
        delete window.Tawk_LoadStart;
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default TawkToChat;

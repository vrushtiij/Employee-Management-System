import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; // Import default styles

export default function MyPopupComponent() {
  return (
    <div>
      <p>Click the button to see a popup:</p>
      <Popup 
        trigger={<button> Click to open popup </button>} 
        position="right center" // Optional positioning
        modal // Use as a modal (with an overlay)
      >
        {close => ( // Function-as-children pattern for custom close logic
          <div>
            <h2>Popup Content</h2>
            <button onClick={close}>Close Modal</button>
          </div>
        )}
      </Popup>
    </div>
  );
}

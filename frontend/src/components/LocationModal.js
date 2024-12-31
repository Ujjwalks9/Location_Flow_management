import React from "react";
import "../styles/LocationModal.css";

const LocationModal = ({ onClose, onEnableLocation, onManualSearch }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Location permission is off</h2>
        </div>
        <div className="modal-body">
          <p>
            We need your location to find the nearest store & provide you a
            seamless delivery experience.
          </p>
          <button className="enable-btn" onClick={onEnableLocation}>
            Enable Location
          </button>
          <button className="search-btn" onClick={onManualSearch}>
            Search your Location Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

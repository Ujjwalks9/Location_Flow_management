import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { LocationContext } from "../context/LocationContext";
import "../styles/LocationMap.css";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 19.0760, // Default latitude
  lng: 72.8777, // Default longitude
};

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// dotenv.config({ path: path.resolve(__dirname, "config.env") });

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const { setLocation } = useContext(LocationContext); // Use global context
  const navigate = useNavigate();
  const location = useLocation();

  // const fetchAddress = (latitude, longitude) => {
  //   const googleApiKey = "AIzaSyCw16nIEIBan-D0pTvgxwAbRKbyY9kJE-A"; // Replace with your actual API key

  //   return fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === "OK") {
  //         return data.results[0]?.formatted_address || "Address Not Available";
  //       }
  //       console.warn("Failed to fetch address:", data.status);
  //       return "Address Not Available";
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching address from Google Maps API:", error);
  //       return "Address Not Available";
  //     });
  // };
  const fetchAddress = async (latitude, longitude) => {
    const googleApiKey = "YOUR_GOOGLE_API"; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`HTTP error: ${response.status}`);
        return "Address Not Available";
      }
  
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        console.warn("Geocoding API response:", data);
        return "Address Not Available";
      }
    } catch (error) {
      console.error("Error fetching address from Google Maps API:", error);
      return "Address Not Available";
    }
  };
  // const testFetchAddress = async () => {
  //   const testLat = 19.067512552860624; // Example latitude
  //   const testLng = 72.86900997161865; // Example longitude
  
  //   console.log("Fetching address for:", testLat, testLng);
  
  //   const address = await fetchAddress(testLat, testLng);
  
  //   console.log("Fetched address:", address);
  // };
  
  // // Call the test function
  // testFetchAddress();
  
  

  const handleEnable = () => {
    fetchAddress(selectedLocation.lat, selectedLocation.lng).then((address) => {
      setLocation({ latitude: selectedLocation.lat, longitude: selectedLocation.lng, address });

      if (address === "Address Not Available" || address === null) {
        navigate("/addressform2");
      } else {
        navigate("/addressform1");
      }
    });
  };

  const handleChange = () => {
    fetchAddress(selectedLocation.lat, selectedLocation.lng).then((address) => {
      setLocation({ latitude: selectedLocation.lat, longitude: selectedLocation.lng, address });

      const updatedLat = selectedLocation.lat;
      const updatedLng = selectedLocation.lng;

      if (address === "Address Not Available" || address === null) {
        alert(
          `Location updated! Latitude: ${updatedLat}, Longitude: ${updatedLng}, Address: ${address}. Navigating to Address Form 2.`
        );
        navigate("/addressform2");
      } else {
        alert(
          `Location updated! Latitude: ${updatedLat}, Longitude: ${updatedLng}, Address: ${address}. Navigating to Address Form 2.`
        );
        navigate("/addressform1");
      }
    });
  };

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

    // Add this function in LocationMap.js
  const setMarkerPosition = (latitude, longitude) => {
    setSelectedLocation({ lat: latitude, lng: longitude });
  };

  useEffect(() => {
    if (location.state && location.state.latitude && location.state.longitude) {
      setMarkerPosition(location.state.latitude, location.state.longitude);
    }
  }, [location]);


  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ lat: latitude, lng: longitude });
        },
        () => {
          alert("Geolocation failed. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="location-selector-container">
      <h3 className="header">Location Information</h3>
      <div className="map-container">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_API">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={selectedLocation}
            zoom={15}
            onClick={handleMapClick}
          >
            <Marker position={selectedLocation}>
              <div className="marker-info">
                <p>Your order will be delivered here</p>
                <small>Move pin to your exact location</small>
              </div>
            </Marker>
          </GoogleMap>
        </LoadScript>
      </div>
      <button className="locate-button" onClick={handleLocateMe}>
        Locate Me
      </button>
      <div className="location-details">
        <h5>Select Your Delivery Location</h5>
        <p>{`Latitude: ${selectedLocation.lat}, Longitude: ${selectedLocation.lng}`}</p>
        <button className="enable-button" onClick={handleEnable}>
          Enable
        </button>
        <button className="change-button" onClick={handleChange}>
          Change
        </button>
      </div>
    </div>
  );
};

export default LocationSelector;

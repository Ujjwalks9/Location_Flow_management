import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LocationMap from "./components/LocationMap";
import AddressForm1 from "./components/AddressForm1";
import AddressForm2 from "./components/AddressForm2";
import SaveAddresses from "./components/savedaddresses";
import { LocationProvider } from "./context/LocationContext"; // Import the context provider

const App = () => {
  return (
    <LocationProvider> {/* Wrap the app with the LocationProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/location-map" element={<LocationMap />} />
          <Route path="/addressform1" element={<AddressForm1 />} />
          <Route path="/addressform2" element={<AddressForm2 />} />
          <Route path="/savedaddresses" element={<SaveAddresses />} />
        </Routes>
      </Router>
    </LocationProvider>
  );
};

export default App;

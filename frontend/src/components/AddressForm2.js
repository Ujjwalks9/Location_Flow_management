import React, { useContext, useState } from "react";
import "../styles/AddressForm1.css";
import { LocationContext } from "../context/LocationContext"; // Import the context

const AddressForm1 = () => {
  const { location } = useContext(LocationContext); // Get the globally shared address
  const [houseBlock, setHouseBlock] = useState("");
  const [apartmentArea, setApartmentArea] = useState("");
  const [address, setAddress] = useState(location?.address || "");

  const handleSaveAddress = async (selectedCategory) => {
    if (!houseBlock || !apartmentArea) {
      alert("Please fill out all fields before saving.");
      return;
    }

    const payload = {
      userId: "defaultUser", // Replace with dynamic user ID if available
      address: location?.address || null,
      houseBlock,
      apartmentArea,
      category: selectedCategory,
      latitude: location?.latitude || null,
      longitude: location?.longitude || null,
    };

    try {
      const response = await fetch("http://localhost:7000/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(`Address saved for ${selectedCategory}!`);
      } else {
        const errorData = await response.json();
        console.error("Error saving address:", errorData);
        alert("Failed to save address. Please try again.");
      }
    } catch (error) {
      console.error("Error posting to backend:", error);
      alert("An error occurred while saving the address.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        {/* Display the global address */}
        <h3 className="form-title">Enter Complete Address</h3>

        {/* Additional Input Field */}
        <div className="form-inputs">
        <label>
            Address:
            <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            />
        </label>
        </div>

        {/* Form inputs */}
        <div className="form-inputs">
          <label>
            House/Flat/Block No.:
            <input
              type="text"
              value={houseBlock}
              onChange={(e) => setHouseBlock(e.target.value)}
              placeholder="Enter House/Flat/Block No."
            />
          </label>
          <label>
            Apartment/Road/Area:
            <input
              type="text"
              value={apartmentArea}
              onChange={(e) => setApartmentArea(e.target.value)}
              placeholder="Enter Apartment/Road/Area"
            />
          </label>
        </div>
        <h3>{"SAVE AS"}</h3>

        {/* Save address buttons */}
        <div className="save-icons">
          <button onClick={() => handleSaveAddress("Home")} className="save-button">
            <i className="icon-home"></i> Home
          </button>
          <button onClick={() => handleSaveAddress("Office")} className="save-button">
            <i className="icon-office"></i> Office
          </button>
          <button onClick={() => handleSaveAddress("Other")} className="save-button">
            <i className="icon-other"></i> Other
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm1;

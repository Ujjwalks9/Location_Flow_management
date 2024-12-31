

import React, { useState, useContext } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import LocationModal from "./LocationModal";
import "../styles/Homepage.css";
import { LocationContext } from "../context/LocationContext"; // Import the context

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLocation } = useContext(LocationContext);

  const [isModalOpen, setIsModalOpen] = useState(
    location.state?.showModal ?? true // Default to true unless specified
  );

  const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User's location:", latitude, longitude);

        let address = "Address not available";

        try {
          const googleApiKey = "YOUR_GOOGLE_API"; // Replace with your API key
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`
          );
          const data = await response.json();

          if (data.status === "OK") {
            address = data.results[0]?.formatted_address || address;
            console.log("Address fetched from Google Maps:", address);
          } else {
            console.warn("Failed to fetch address:", data.status);
            alert("Address NOT Found! Please Type Your Address manually.");
          }
        } catch (error) {
          console.error("Error fetching address from Google Maps API:", error);
          alert("An error occurred. You can adjust the marker manually.");
        }

        // Update global state with coordinates and address (can be null)
        setLocation({ latitude, longitude, address });

        // Navigate to location-map with preloaded coordinates
        navigate("/location-map", {
          state: { latitude, longitude },
        });

        setIsModalOpen(false); // Close modal
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Failed to get location. Please try again.");
      }
    );
  };

  const handleManualSearch = () => {
    console.log("Redirect to manual search input.");
    navigate("/location-map");
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="header-left">
          <h1>E-Commerce Website</h1>
        </div>
        <nav className="header-right">
          <ul>
            <li>
              <a href="#login">Login</a>
            </li>
            <li>
              <a href="#orders">Orders</a>
            </li>
            <li>
              <a href="#wishlist">Wishlist</a>
            </li>
            <li>
              <a href="#profile">Profile</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          <div className="product">
            <img src="../images/p1.jpg" alt="Product 1" />
            <h3>Product 1</h3>
            <p>$100</p>
          </div>
          <div className="product">
            <img src="../images/p2.jpg" alt="Product 2" />
            <h3>Product 2</h3>
            <p>$150</p>
          </div>
          <div className="product">
            <img src="/images/p3.jpg" alt="Product 3" />
            <h3>Product 3</h3>
            <p>$200</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Our E-Commerce Store</p>
      </footer>

      {isModalOpen && (
        <LocationModal
          onEnableLocation={handleEnableLocation}
          onManualSearch={handleManualSearch}
        />
      )}
    </div>
  );
};

export default Homepage;

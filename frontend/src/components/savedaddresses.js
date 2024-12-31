
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/savedaddresses.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBuilding, faUserFriends, faMapMarkerAlt, faHeart , faCrosshairs} from "@fortawesome/free-solid-svg-icons";

const SaveAddresses = () => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState({}); // To track favorite addresses
  const navigate = useNavigate();

  // Fetch addresses from the backend
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/addresses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch addresses");
        const data = await response.json();
        setSavedAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:7000/api/addresses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete address");
      setSavedAddresses(savedAddresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await fetch(`http://localhost:7000/api/search?query=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to search addresses");
      const data = await response.json();
      setRecentSearches(data);
    } catch (error) {
      console.error("Error searching addresses:", error);
    }
  };

  const handleSelectAddress = (address) => {
    console.log("Selected address for delivery:", address);
    // setLocation((prevLocation) => ({
    //     ...prevLocation,
    //     address: address, // Update the selected address
    //     showModal: false, // Turn off the modal
    // }));
    navigate("/", { state: { showModal: false } });
  };

  const handleFavoriteToggle = (id) => {
    setFavorites((prevFavorites) => {
      const isFavorite = !!prevFavorites[id];
      const updatedFavorites = { ...prevFavorites, [id]: !isFavorite };
      if (!isFavorite) {
        alert("Address saved as favorite!");
      }
      return updatedFavorites;
    });
  };

  const navigateToLocationMap = () => {
    navigate("/location-map"); // Navigate to location-map page
  };

  const handleMapPreview = (address) => {
    // Navigate to the map view and pass latitude and longitude
    navigate("/location-map", {
      state: {
        latitude: address.latitude,
        longitude: address.longitude,
      },
    });
  };
  

  // Map category to icons and names
  const getIconAndName = (category) => {
    switch (category) {
      case "Home":
        return { icon: faHome, name: "Home" };
      case "Office":
        return { icon: faBuilding, name: "Office" };
      case "Others":
        return { icon: faUserFriends, name: "Others" };
      default:
        return { icon: faMapMarkerAlt, name: "Others" };
    }
  };

  return (
    <div className="address-container">
      <h2>Your Location</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search your area/pincode/apartment"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="current-location-btn">Enable</button>
      </div>
      <div className="current-location-wrapper">
          <button className="current-location-btn" onClick={navigateToLocationMap}>
            <FontAwesomeIcon icon={faCrosshairs} /> Current location
          </button>
          <button className="current-location-btn" onClick={navigateToLocationMap}>
            Add new Addresses
          </button>
        </div>

      <section className="saved-section">
        <h3>Saved Locations</h3>
        {savedAddresses.map((address) => {
          const { icon, name } = getIconAndName(address.category);
          const isFavorite = favorites[address._id];
          return (
            <div key={address._id} className="address-item">
              <div className="address-top">
                <FontAwesomeIcon icon={icon} className="icon" />
                <span className="category-name">{name}</span>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`heart-icon ${isFavorite ? "favorite" : ""}`}
                  onClick={() => handleFavoriteToggle(address._id)}
                />
              </div>
              <p className="address-text">{address.address}</p>
              <p className="subtext">
                {address.houseBlock}, {address.apartmentArea}
              </p>
              <div className="actions">
                <button onClick={() => handleSelectAddress(address)}>Select</button>
                <button onClick={() => handleMapPreview(address)}>Map Preview</button>
                <button onClick={() => handleDelete(address._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </section>

      <section className="recent-section">
        <h3>Recent Searches</h3>
        {recentSearches.map((search, index) => (
          <div key={index} className="address-item">
            <p>{search}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SaveAddresses;

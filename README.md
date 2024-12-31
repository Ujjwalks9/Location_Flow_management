
## 📌 **Project Overview**
This project implements a **Location/Address Flow** for a delivery system, allowing users to select, manage, and save delivery addresses seamlessly. The application integrates **Google Maps API** for map functionalities and provides an intuitive and responsive UI for users to interact with their delivery locations.

---


### **DEMO VIDEO**



https://github.com/user-attachments/assets/a68fe769-511b-465e-9b5a-79c08a89e7c8


## 🛠️ **Technologies Used**
- **Frontend**: React.js, React Router, Context API.
- **Backend**: Node.js, Express.js.
- **Map Integration**: Google Maps API.
- **State Management**: Context API.

---

## 🚀 **Features**

### **1. Modal for Location Permission**
- Displays a **popup modal** when location permissions are not enabled.
- **Buttons:**
  - **Enable Location**: Requests the user's location using browser geolocation permissions.
  - **Search Manually**: Redirects to a Google Maps location search interface for manual selection.

---

### **2. Location Selection & Geolocation**
- Displays a map where users can:
  - View their current location.
  - Adjust a pin on the map to fine-tune the delivery location.
- Includes a **Locate Me** button for automatic detection of the user's current location.
- Fetches and displays the **formatted address** using the Google Maps API.

---

### **3. Delivery Address Form**
- Allows users to specify additional details:
  - **House/Flat/Block No.**
  - **Apartment/Road/Area**
- Users can categorize addresses as **Home, Office, or Friends & Family** by selecting from intuitive icons.

---

### **4. Address Management**
- Displays a list of **saved addresses** with options to:
  - **Select**: Choose an address for delivery.
  - **Update/Delete**: Modify or remove existing addresses.
  - **Search**: Quickly find recent or saved addresses.
- Supports a **Map Preview** feature to visualize saved addresses on the map.

---

### **5. Bonus Features**
- **Save as Favorite**: Mark frequently used addresses as favorites with a heart icon.
  - Displays a **red heart** for favorite addresses.
  - Alerts the user when an address is marked as favorite.
- **Address Validation**: Ensures the accuracy of entered address data.
- **Error Handling**: Handles scenarios like:
  - Location permission denial.
  - Invalid addresses or network issues.
- Fully **responsive design** for all devices.

---

## ⚙️ **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/location-address-flow.git
cd location-address-flow
```

### **2. Install Dependencies**
- For the frontend:
  ```bash
  cd frontend
  npm install
  ```
- For the backend:
  ```bash
  cd backend
  npm install
  ```

### **3. Start the Application**
- Run the backend server:
  ```bash
  cd backend
  npm start
  ```
- Run the frontend application:
  ```bash
  cd frontend
  npm start
  ```

---

## 🔑 **Core Functionalities**

### **Frontend**
1. **Modal for Permissions**: Automatically displays on the homepage when permissions are off.
2. **Map Integration**:
   - Displays user location and allows manual pin adjustment.
   - Handles location updates through the **Locate Me** button.
3. **Address Management**:
   - Add, edit, delete, and favorite addresses.
   - Search saved or recent addresses.
   - Preview addresses on the map.

### **Backend**
1. **APIs for Address Management**:
   - Fetch, save, update, and delete addresses.
2. **Address Validation**:
   - Validates location data fetched from Google Maps API. (PUT YOUR GOOGLE MAP API FOR USE)

---

## 📋 **Bonus Features Implemented**
- **Save as Favorite**: Allows users to mark addresses as favorites for quick access.
- **Map Preview**: Enables users to preview saved addresses on Google Maps.
- **Error Handling**: Handles geolocation errors and invalid data gracefully.

---

## 📂 **Project Structure**
```
root
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   │   ├── LocationMap.js
│   │   │   ├── SavedAddresses.js
|   |   |   |── HomePage.js
|   |   |   |── LocationModal.js
|   |   |   |── AddressForm2.js
│   │   │   └── AddressForm1.js
│   │   ├── context
│   │   │   └── LocationContext.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

---

## 🌟 **How to Use**
1. **Start the App**:
   - Visit `http://localhost:3000` to access the frontend.
2. **Enable Location**:
   - Allow browser permissions or manually select a location.
3. **Add Address**:
   - Use the form to save an address with details and categories.
4. **Manage Saved Addresses**:
   - View, edit, delete, favorite, or preview addresses on the map.

---

## 📝 **Evaluation Highlights**
- **Fully Functional Features**: All steps of the assignment are implemented.
- **Responsive Design**: Works seamlessly across devices.
- **Error Handling**: Covers location permission and network errors.
- **Bonus Features**: Includes favorites, map preview, and address validation.

---

## 📧 **Contact**
For queries or feedback, feel free to reach out at [your email].

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { type } from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "config.env") });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema and Model
const addressSchema = new mongoose.Schema({
  userId: { type: String },
  address: { type: String},
  houseBlock: { type: String},
  apartmentArea: { type: String},
  category: {
    type: String,
    enum: ["Home", "Office", "Friends", "Other"],
    default: "Home",
  },
  latitude: { type: Number },
  longitude: { type: Number }, 
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);

// Routes

// Save a new address
app.post("/api/addresses", async (req, res) => {
  try {
    const { address, houseBlock, apartmentArea, category,  latitude, longitude, } = req.body;
    const userId = "defaultUser"; // Placeholder for user authentication
    const newAddress = new Address({ userId, address, houseBlock, apartmentArea, category, latitude, longitude, });
    await newAddress.save();
    res.status(201).json({ message: "Address saved successfully!", address: newAddress });
  } catch (err) {
    console.error("Error saving address:", err);
    res.status(500).json({ error: "Failed to save address!" });
  }
});

// Get all addresses
app.get("/api/addresses", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    console.error("Error fetching addresses:", err);
    res.status(500).json({ error: "Failed to fetch addresses!" });
  }
});

// Update an address by ID
app.put("/api/addresses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { houseBlock, apartmentArea, category } = req.body;

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { houseBlock, apartmentArea, category },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ error: "Address not found!" });
    }

    res.json({ message: "Address updated successfully!", address: updatedAddress });
  } catch (err) {
    console.error("Error updating address:", err);
    res.status(500).json({ error: "Failed to update address!" });
  }
});

// Delete an address by ID
app.delete("/api/addresses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ error: "Address not found!" });
    }

    res.json({ message: "Address deleted successfully!" });
  } catch (err) {
    console.error("Error deleting address:", err);
    res.status(500).json({ error: "Failed to delete address!" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

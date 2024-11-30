const express = require("express");
const Admin = require("../models/admin");
const router = express.Router();

// Create Admin
router.post("/", async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json(admin);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Admins
router.get("/", async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a User
router.delete("/:id", async (req, res) => {
    try {
        const adminId = req.params.id;

        const admin = await Admin.findByIdAndDelete(adminId);

        if (!admin) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Admin deleted successfully", admin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Find vendor by email
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Compare password (plain text)
      if (admin.password !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Successful login
      res.status(200).json({ message: "Login successful", adminId: admin._id, name: admin.name });
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      res.status(500).json({ error: "Server error", message: error.message });
    }
  });

module.exports = router;

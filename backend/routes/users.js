const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "_id email membership_duration"); // Retrieve only the _id and email
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Users
// router.get("/", async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Create User
// router.post("/", async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.status(201).json(user);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// Get particular User
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update membership_duration of a User
router.patch("/update_membership", async (req, res) => {
  try {
    const { email, membership_duration } = req.body; // Extract email and membership_duration from the request body

    // Validate email format (optional)
    if (email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Find user by email and update membership_duration
    const user = await User.findOneAndUpdate(
      { email }, // Find user by email
      { membership_duration }, // Update the membership_duration
      { new: true, runValidators: true } // Return the updated user and run validation
    );

    // If no user is found, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the updated user
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a User
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", user });
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password (plain text)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful",
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

module.exports = router;

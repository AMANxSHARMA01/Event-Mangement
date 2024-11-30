const express = require("express");
const Vendor = require("../models/vendor");
const Item = require("../models/item");
const router = express.Router();

// Create Vendor
router.post("/", async (req, res) => {
    try {
        const vendor = new Vendor(req.body);
        await vendor.save();
        res.status(201).json(vendor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find({}, "_id email"); // Retrieve only the _id and email
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Vendor
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
  
      // Find vendor by email
      const vendor = await Vendor.findOne({ email });
      if (!vendor) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Compare password (plain text)
      if (vendor.password !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Successful login
      res.status(200).json({ message: "Login successful", vendorId: vendor._id, name:vendor.name});
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      res.status(500).json({ error: "Server error", message: error.message });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const vendors = await Vendor.find({}, "_id email"); // Retrieve only the _id and email
      res.json(vendors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.get('/category/:category', async(req, res) => {
    // Get the category from the URL
    try {
        const category = req.params.category; // Get the category from the URL
        const vendors =  await Vendor.find({ category }); // Find vendors matching the category
    
        if (vendors.length === 0) {
          return res.status(404).json({ message: "No vendors found for this category." });
        }
        
    
        res.json(vendors); // Send the vendors as a response
      } catch (err) {
        console.error("Error fetching vendors", err);
        res.status(500).json({ message: "Server error." });
      }
  });


// Get All Vendors
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const vendors = await Vendor.findById(id);
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Vendor Membership
router.patch("/update_membership", async (req, res) => {
    try {
        const { email, membership_duration } = req.body; // Extract email and membership_duration from the request body

        // Validate email format (optional)
        if (email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Find user by email and update membership_duration
        const vendor = await Vendor.findOneAndUpdate(
            { email }, // Find user by email
            { membership_duration }, // Update the membership_duration
            { new: true, runValidators: true } // Return the updated user and run validation
        );

        // If no user is found, return an error
        if (!vendor) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return the updated user
        res.json(vendor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Vendor
router.delete("/:id", async (req, res) => {
    try {
        const vendorId = req.params.id;

        const vendor = await Vendor.findByIdAndDelete(vendorId);

        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        res.json({ message: "Vendor deleted successfully", vendor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/:vendorId/items", async (req, res) => {
    try {
      const { vendorId } = req.params;
      const { name, price, description, quantity } = req.body;
  
      // Create new item
      const newItem = new Item({
        name,
        price,
        description,
        quantity
      });
      await newItem.save();
  
      // Find the vendor and add the item to their items array
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
  
      vendor.items.push(newItem._id); // Add the new item's ID to the vendor's items array
      await vendor.save();
  
      res.status(201).json(newItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


router.get('/:id/items', async(req, res) => {
    // Get the category from the URL
    try {
        const id = req.params.id; // Get the category from the URL
        const vendor =  await Vendor.findById(id).populate('items'); // Find vendors matching the category
    
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        
        res.json(vendor.items); // Send the vendors as a response
      } catch (err) {
        console.error("Error fetching vendors", err);
        res.status(500).json({ message: "Server error." });
      }
  });

module.exports = router;

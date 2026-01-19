import express from "express";
import cors from "cors";
import Profile from "./models/profile.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = 3000;

// middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Server running......");
});

/* =========================
   API ROUTES (SAME FILE)
========================= */

// GET ALL PROFILES
app.get("/api/profile", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CREATE PROFILE
app.post("/api/profile", async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();

    res.status(201).json({
      success: true,
      message: "Profile saved successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE PROFILE
app.patch("/api/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated",
      data: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET PROJECTS BY SKILL
app.get("/api/projects", async (req, res) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({
        message: "Skill query is required",
      });
    }

    const profiles = await Profile.find({
      skills: { $regex: skill, $options: "i" },
    }).select("projects");

    const projects = profiles.flatMap(p => p.projects);

    res.json({
      skill,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET TOP SKILLS
app.get("/api/skills/top", async (req, res) => {
  try {
    const skills = await Profile.aggregate([
      { $unwind: "$skills" },
      {
        $group: {
          _id: "$skills",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SEARCH
app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Search query required",
      });
    }

    const results = await Profile.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { skills: { $regex: q, $options: "i" } },
        { "projects.title": { $regex: q, $options: "i" } },
      ],
    });

    res.json({
      query: q,
      count: results.length,
      results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ========================= */

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

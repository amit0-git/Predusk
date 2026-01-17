import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String],
});

const Profile = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    education: String,
    skills: [String],

    projects: [projectSchema],

    work: [String],

    links: {
      github: String,
      linkedin: String,
      portfolio: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", Profile);

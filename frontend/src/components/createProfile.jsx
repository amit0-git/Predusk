import { useState } from "react";
import axios from "axios";

export default function CreateProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
    work: "",
    projectTitle: "",
    projectDescription: "",
    projectLinks: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    await axios.post("/api/profile", {
      name: form.name,
      email: form.email,
      education: form.education,

      skills: form.skills.split(",").map(s => s.trim()),

      work: form.work.split(",").map(w => w.trim()),

      projects: [
        {
          title: form.projectTitle,
          description: form.projectDescription,
          links: form.projectLinks.split(",").map(l => l.trim()),
        },
      ],

      links: {
        github: form.github,
        linkedin: form.linkedin,
        portfolio: form.portfolio,
      },
    });

    alert("Profile created ✅");

    setForm({
      name: "",
      email: "",
      education: "",
      skills: "",
      work: "",
      projectTitle: "",
      projectDescription: "",
      projectLinks: "",
      github: "",
      linkedin: "",
      portfolio: "",
    });
  };

  return (
    <>
      <h2>➕ Create Profile</h2>

      <form onSubmit={submit}>
        <input placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <br />

        <input placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <br />

        <input placeholder="Education"
          value={form.education}
          onChange={(e) => setForm({ ...form, education: e.target.value })} />
        <br />

        <input placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <br />

        <input placeholder="Work (comma separated)"
          value={form.work}
          onChange={(e) => setForm({ ...form, work: e.target.value })} />
        <br />

        <h4>Project</h4>
        <input placeholder="Project Title"
          value={form.projectTitle}
          onChange={(e) => setForm({ ...form, projectTitle: e.target.value })} />
        <br />

        <input placeholder="Project Description"
          value={form.projectDescription}
          onChange={(e) => setForm({ ...form, projectDescription: e.target.value })} />
        <br />

        <input placeholder="Project Links (comma separated)"
          value={form.projectLinks}
          onChange={(e) => setForm({ ...form, projectLinks: e.target.value })} />
        <br />

        <h4>Social Links</h4>
        <input placeholder="GitHub"
          value={form.github}
          onChange={(e) => setForm({ ...form, github: e.target.value })} />
        <br />

        <input placeholder="LinkedIn"
          value={form.linkedin}
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
        <br />

        <input placeholder="Portfolio"
          value={form.portfolio}
          onChange={(e) => setForm({ ...form, portfolio: e.target.value })} />
        <br />

        <button type="submit">Create Profile</button>
      </form>
    </>
  );
}

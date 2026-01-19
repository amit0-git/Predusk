import { useState } from "react";
import api from "../api/axios";

export default function UpdateProfile() {
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    education: "",
    skills: "",
    work: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    await api.patch(`/api/profile/${id}`, {
      education: form.education,
      skills: form.skills
        ? form.skills.split(",").map(s => s.trim())
        : undefined,
      work: form.work
        ? form.work.split(",").map(w => w.trim())
        : undefined,
    });

    alert("Profile updated ✅");
    setId("");
    setForm({ education: "", skills: "", work: "" });
  };

  return (
    <>
      <h2>✏️ Update Profile</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Profile ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br />

        <input
          placeholder="New Education"
          value={form.education}
          onChange={(e) => setForm({ ...form, education: e.target.value })}
        />
        <br />

        <input
          placeholder="New Skills (comma separated)"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
        />
        <br />

        <input
          placeholder="New Work (comma separated)"
          value={form.work}
          onChange={(e) => setForm({ ...form, work: e.target.value })}
        />
        <br />

        <button type="submit">Update Profile</button>
      </form>
    </>
  );
}

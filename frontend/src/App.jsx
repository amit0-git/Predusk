import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateProfile from "./components/createProfile";
import UpdateProfile from "./components/updateProfile";

export default function App() {
  const location = useLocation();

  const [skill, setSkill] = useState("");
  const [projects, setProjects] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [topSkills, setTopSkills] = useState([]);

  /* ================= FETCH ================= */

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("/api/profile");
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopSkills = async () => {
    try {
      const res = await axios.get("/api/skills/top");
      setTopSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchProjects = async () => {
    if (!skill) return;

    try {
      const res = await axios.get("/api/projects", {
        params: { skill },
      });
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfiles();
    fetchTopSkills();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* ================= HEADER ================= */}
      <h1>Profile Portal</h1>

      {/* ================= NAV LINKS ================= */}
      <nav style={{ marginBottom: "15px" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/create">Create Profile</Link> |{" "}
        <Link to="/update">Update Profile</Link>
      </nav>

      {/* ================= HOME CONTENT ================= */}
      {location.pathname === "/" && (
        <>
          {/* SEARCH BAR */}
          <h2>🔍 Search Projects by Skill</h2>
          <input
            placeholder="Enter skill (React, Docker)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <button onClick={searchProjects}>Search</button>

          {projects.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <h3>Projects</h3>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <b>{p.title}</b>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          )}

          <hr />

          {/* TOP SKILLS */}
          <h2>🔥 Top Skills</h2>
          <ul>
            {topSkills.map((s) => (
              <li key={s._id}>
                {s._id} ({s.count})
              </li>
            ))}
          </ul>

          <hr />

          {/* PROFILES */}
          <h2>👤 Profiles</h2>

          {profiles.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "6px",
              }}
            >
              <h3>{p.name}</h3>
              <p><b>Email:</b> {p.email}</p>
              <p><b>Education:</b> {p.education || "N/A"}</p>

              {/* SKILLS */}
              <p>
                <b>Skills:</b>{" "}
                {p.skills?.length ? p.skills.join(", ") : "N/A"}
              </p>

              {/* WORK */}
              <p>
                <b>Work:</b>{" "}
                {p.work?.length ? p.work.join(", ") : "N/A"}
              </p>

              {/* PROJECTS */}
              <div>
                <b>Projects:</b>
                {p.projects?.length ? (
                  p.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginLeft: "15px",
                        marginTop: "8px",
                        paddingLeft: "8px",
                        borderLeft: "3px solid #999",
                      }}
                    >
                      <p><b>Title:</b> {proj.title}</p>
                      <p><b>Description:</b> {proj.description}</p>

                      {proj.links?.length > 0 && (
                        <ul>
                          {proj.links.map((l, i) => (
                            <li key={i}>
                              <a
                                href={l}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {l}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p style={{ marginLeft: "10px" }}>No projects</p>
                )}
              </div>

              {/* SOCIAL LINKS */}
              <div>
                <b>Links:</b>
                <ul>
                  {p.links?.github && (
                    <li>
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    </li>
                  )}
                  {p.links?.linkedin && (
                    <li>
                      <a
                        href={p.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>
                    </li>
                  )}
                  {p.links?.portfolio && (
                    <li>
                      <a
                        href={p.links.portfolio}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Portfolio
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <small><b>ID:</b> {p._id}</small>
            </div>
          ))}
        </>
      )}

      {/* ================= ROUTES ================= */}
      <Routes>
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/update" element={<UpdateProfile />} />
      </Routes>
    </div>
  );
}

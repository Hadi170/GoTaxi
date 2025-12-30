import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";


export default function AdminDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setErr("");

    try {
      const res = await fetch(`${API}/api/driver-applications`, {
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/admin/login");
        return;
      }

      const data = await res.json();
      setApps(data);
    } catch (e) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch(`${API}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/admin/login");
  }

  async function approve(id) {
    await fetch(`${API}/api/admin/applications/${id}/approve`, {
      method: "POST",
      credentials: "include",
    });
    load();
  }

  async function decline(id) {
    await fetch(`${API}/api/admin/applications/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    load();
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Driver Applications</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {err && <p style={{ color: "red" }}>{err}</p>}

      {apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {apps.map((a) => (
            <div
              key={a.id}
              style={{
                border: "1px solid #333",
                borderRadius: 10,
                padding: 12,
              }}
            >
              <h3 style={{ margin: 0 }}>{a.full_name}</h3>

              <p style={{ margin: "6px 0" }}>
                {a.city} • {a.phone} • {a.email}
              </p>

              <p style={{ margin: "6px 0" }}>
                {a.car_model} ({a.car_year}) • {a.car_color}
              </p>

              <p style={{ margin: "6px 0" }}>
                Exp: {a.experience_years} years • {a.availability}
              </p>

              <p style={{ margin: "6px 0" }}>
                License: {a.license_number}
              </p>

              <p style={{ margin: "6px 0" }}>
                Style: {a.driving_style || "-"}
              </p>

              <p style={{ margin: "6px 0" }}>
                Status: <b>{a.status}</b>
              </p>

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  onClick={() => approve(a.id)}
                  disabled={a.status !== "pending"}
                >
                  Approve
                </button>
                <button
                  onClick={() => decline(a.id)}
                  disabled={a.status !== "pending"}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
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
      if (!res.ok) {
        setErr(data?.error || "Failed to load applications");
        return;
      }

      setApps(data);
    } catch {
      setErr("Network error");
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
  }, []);

  const badge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-bold";
    if (status === "approved") return `${base} bg-green-500/20 text-green-200 border border-green-500/40`;
    if (status === "declined") return `${base} bg-red-500/20 text-red-200 border border-red-500/40`;
    return `${base} bg-yellow-500/20 text-yellow-200 border border-yellow-500/40`;
  };

  return (
    <div className="min-h-screen bg-yellow-400 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-black text-yellow-300 rounded-2xl shadow-xl p-6 sm:p-8 border border-yellow-500/30">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-yellow-400">Admin Dashboard</h1>
            <p className="text-sm text-gray-300 mt-1">Driver applications review</p>
          </div>
          <button
            onClick={logout}
            className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            Logout
          </button>
        </div>

        {err && (
          <div className="mt-4 bg-red-500/20 border border-red-500/40 text-red-200 rounded-lg px-3 py-2 text-sm">
            {err}
          </div>
        )}

        <div className="mt-6">
          {loading ? (
            <p className="text-gray-300">Loading...</p>
          ) : apps.length === 0 ? (
            <p className="text-gray-300">No applications yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {apps.map((a) => (
                <div
                  key={a.id}
                  className="bg-gray-950/60 rounded-2xl p-5 border border-yellow-500/20 shadow"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={a.photo}
                      alt="driver"
                      className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold text-yellow-300">{a.full_name}</h3>
                          <p className="text-sm text-gray-300">{a.email}</p>
                          <p className="text-sm text-gray-300">{a.phone}</p>
                        </div>
                        <span className={badge(a.status)}>{a.status}</span>
                      </div>

                      <p className="text-xs text-gray-400 mt-1">
                        Submitted: {new Date(a.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-200 space-y-1">
                    <p><span className="text-yellow-300/90 font-semibold">City:</span> {a.city}</p>
                    <p><span className="text-yellow-300/90 font-semibold">Experience:</span> {a.experience_years} years</p>
                    <p><span className="text-yellow-300/90 font-semibold">Availability:</span> {a.availability}</p>
                    <p><span className="text-yellow-300/90 font-semibold">Car:</span> {a.car_model} ({a.car_year}) - {a.car_color}</p>
                    <p><span className="text-yellow-300/90 font-semibold">License:</span> {a.license_number}</p>
                    <p><span className="text-yellow-300/90 font-semibold">Style:</span> {a.driving_style || "-"}</p>
                  </div>

                  {a.status === "pending" && (
                    <div className="mt-5 flex gap-2">
                      <button
                        onClick={() => approve(a.id)}
                        className="flex-1 bg-green-500/20 text-green-200 border border-green-500/40 font-bold py-2 rounded-lg hover:bg-green-500/30 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => decline(a.id)}
                        className="flex-1 bg-red-500/20 text-red-200 border border-red-500/40 font-bold py-2 rounded-lg hover:bg-red-500/30 transition"
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  {a.status !== "pending" && (
                    <div className="mt-5 text-xs text-gray-400">
                      Action completed
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

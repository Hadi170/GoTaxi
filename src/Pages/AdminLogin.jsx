import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErr(data?.error || "Login failed");
        return;
      }

      navigate("/admin");
    } catch (e2) {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black text-yellow-300 rounded-2xl shadow-xl p-6 sm:p-8 border border-yellow-500/30">
        <h1 className="text-3xl font-extrabold text-yellow-400 text-center">
          Admin Login
        </h1>
        <p className="text-center text-sm text-gray-300 mt-2">
          Authorized access only
        </p>

        {err && (
          <div className="mt-4 bg-red-500/20 border border-red-500/40 text-red-200 rounded-lg px-3 py-2 text-sm">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Username</label>
            <input
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Password</label>
            <input
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-300 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

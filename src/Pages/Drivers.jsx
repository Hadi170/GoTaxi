import React, { useEffect, useState } from "react";
import { FaCarSide, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleBook = (driver) => {
    navigate(`/booking?driverId=${driver.id}`);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`${API}/api/drivers`);
        const data = await res.json();
        if (!res.ok) {
          setErr(data?.error || "Failed to load drivers");
          return;
        }
        setDrivers(Array.isArray(data) ? data : []);
      } catch {
        setErr("Network error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-yellow-400 px-4 py-8">
      <div className="max-w-6xl mx-auto mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Our Drivers</h1>
          <p className="text-sm text-gray-600">
            Choose the driver that matches your mood and needs.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-gray-900 font-semibold">Loading...</p>
        ) : err ? (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-3">
            {err}
          </div>
        ) : drivers.length === 0 ? (
          <p className="text-gray-900 font-semibold">No drivers yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {drivers.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl shadow-md p-5 border border-yellow-300/60 flex flex-col justify-between"
              >
                <div className="flex items-center gap-4">
                  {d.photo ? (
                    <img
                      src={d.photo}
                      alt={d.full_name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400 shadow-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-sm bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                      {String(d.full_name || "?").trim().slice(0, 1).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-lg font-bold text-gray-900">
                        {d.full_name}
                      </h2>

                      <span className="px-2 py-1 rounded-full text-[11px] font-semibold bg-green-100 text-green-700">
                        Available
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mt-1">
                      City: <span className="font-medium">{d.city}</span>
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      Availability:{" "}
                      <span className="font-medium">{d.availability}</span>
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      Mood:{" "}
                      <span className="font-medium">{d.driving_style || "—"}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaCarSide className="text-gray-700" />
                    <span className="font-semibold">
                      {d.car_model} ({d.car_year}) - {d.car_color}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Exp:{" "}
                      <span className="font-semibold">{d.experience_years || 0} yrs</span>
                    </span>
                    <span className="text-gray-500">License: {d.license_number}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleBook(d)}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2 rounded-full border transition bg-yellow-400 hover:bg-yellow-500 border-yellow-500 text-gray-900"
                  >
                    Book this driver
                  </button>

                  <button className="px-3 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-1">
                    <FaPhoneAlt className="text-xs" />
                    Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drivers;
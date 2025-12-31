import React, { useEffect, useMemo, useState } from "react";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { BsCarFrontFill } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Booking() {
  const [params] = useSearchParams();
  const driverIdFromUrl = params.get("driverId");

  const [drivers, setDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState(driverIdFromUrl || "");
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [err, setErr] = useState("");

  const emptyForm = {
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    ridePrice: 5,
    passengersLabel: "3–4 passengers",
  };

  const [form, setForm] = useState(emptyForm);

  const rideTypes = useMemo(
    () => [
      { name: "Economy", price: 5, passengersLabel: "3–4 passengers" },
      { name: "Comfort", price: 8, passengersLabel: "2 passengers" },
      { name: "Premium", price: 12, passengersLabel: "1 passenger" },
    ],
    []
  );

  const selectedDriver = useMemo(() => {
    const idNum = Number(selectedDriverId);
    return drivers.find((d) => d.id === idNum) || null;
  }, [drivers, selectedDriverId]);

  useEffect(() => {
    const loadDrivers = async () => {
      setLoadingDrivers(true);
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
        setLoadingDrivers(false);
      }
    };

    loadDrivers();
  }, []);

  useEffect(() => {
    if (driverIdFromUrl) setSelectedDriverId(driverIdFromUrl);
  }, [driverIdFromUrl]);

  const setRide = (ride) => {
    setForm((p) => ({
      ...p,
      ridePrice: ride.price,
      passengersLabel: ride.passengersLabel,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    if (!selectedDriverId) return alert("Please choose a driver.");
    if (!form.pickup.trim()) return alert("Pickup location is required.");
    if (!form.dropoff.trim()) return alert("Drop-off location is required.");
    if (!form.date) return alert("Date is required.");
    if (!form.time) return alert("Time is required.");

    alert(
      `Booked!\nDriver: ${selectedDriver?.full_name || "—"}\nPickup: ${form.pickup}\nDrop-off: ${form.dropoff}\nWhen: ${form.date} ${form.time}\nRide: $${form.ridePrice} (${form.passengersLabel})`
    );

    setForm(emptyForm);
    setSelectedDriverId("");
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col">
      <div className="flex-1 py-10 px-4 flex justify-center">
        <div className="w-full max-w-2xl bg-black rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-yellow-400 text-center">
            Book Your Ride
          </h1>
          <p className="text-center text-white mt-1">
            Fast, safe and affordable trips — anytime, anywhere.
          </p>

          {err && (
            <div className="mt-6 bg-red-500/20 border border-red-500/40 text-red-200 rounded-lg px-3 py-2 text-sm">
              {err}
            </div>
          )}

          <form onSubmit={submit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center border rounded-xl p-3 bg-white gap-3">
                <FiMapPin className="text-yellow-400 text-xl" />
                <input
                  className="w-full bg-transparent outline-none"
                  placeholder="Pickup location"
                  value={form.pickup}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, pickup: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-center border rounded-xl p-3 bg-white gap-3">
                <FiMapPin className="text-yellow-400 text-xl" />
                <input
                  className="w-full bg-transparent outline-none"
                  placeholder="Drop-off location"
                  value={form.dropoff}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dropoff: e.target.value }))
                  }
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-yellow-300">Choose driver</h2>

              <div className="mt-3 flex items-center gap-4">
                <div className="flex-1">
                  <select
                    className="w-full border rounded-xl p-3 bg-white outline-none"
                    value={selectedDriverId}
                    onChange={(e) => setSelectedDriverId(e.target.value)}
                    disabled={loadingDrivers}
                  >
                    <option value="">Select a driver</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.full_name} — {d.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-14 h-14 rounded-full border-2 border-yellow-400 overflow-hidden bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                  {selectedDriver?.photo ? (
                    <img
                      src={selectedDriver.photo}
                      alt={selectedDriver.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    String(selectedDriver?.full_name || "A")
                      .trim()
                      .slice(0, 1)
                      .toUpperCase()
                  )}
                </div>
              </div>

              {selectedDriver && (
                <div className="mt-3 text-sm text-gray-200">
                  <span className="text-yellow-300 font-semibold">Car:</span>{" "}
                  {selectedDriver.car_model} ({selectedDriver.car_year}) —{" "}
                  {selectedDriver.car_color}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-yellow-300">Choose your ride</h2>
              <div className="flex gap-4 overflow-x-auto mt-3 pb-2">
                {rideTypes.map((ride) => {
                  const active = form.ridePrice === ride.price;
                  return (
                    <button
                      type="button"
                      key={ride.price}
                      onClick={() => setRide(ride)}
                      className={`min-w-[140px] rounded-xl p-4 text-center border transition ${
                        active
                          ? "border-yellow-400 bg-yellow-400/15"
                          : "border-white/25 hover:border-yellow-400 bg-white/5"
                      }`}
                    >
                      <BsCarFrontFill className="text-3xl mx-auto mb-2 text-yellow-400" />
                      <p className="font-semibold text-white">{ride.name}</p>
                      <p className="text-sm text-yellow-300 font-bold">${ride.price}</p>
                      <p className="text-xs text-gray-200 mt-1">
                        {ride.passengersLabel}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-yellow-300">Trip details</h2>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="border rounded-xl p-3 flex items-center gap-3 bg-white">
                  <FiCalendar className="text-yellow-400 text-xl" />
                  <input
                    type="date"
                    className="bg-transparent outline-none w-full"
                    value={form.date}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, date: e.target.value }))
                    }
                  />
                </div>

                <div className="border rounded-xl p-3 flex items-center gap-3 bg-white">
                  <FiClock className="text-yellow-400 text-xl" />
                  <input
                    type="time"
                    className="bg-transparent outline-none w-full"
                    value={form.time}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, time: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-300">
                Passengers:{" "}
                <span className="font-semibold text-yellow-300">
                  {form.passengersLabel}
                </span>
              </div>
            </div>

            <button className="w-full bg-yellow-400 text-black py-4 rounded-full text-lg font-semibold hover:opacity-90 transition">
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;
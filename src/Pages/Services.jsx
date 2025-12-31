import React, { useState } from "react";
const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Services = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    experienceYears: "",
    carModel: "",
    carColor: "",
    carYear: "",
    licenseNumber: "",
    mood: "",
    availability: "full-time",
    agree: false,
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("You must agree to the terms before submitting.");
      return;
    }

    if (!form.photo) {
      alert("Profile photo is required.");
      return;
    }
console.log(form.photo?.slice(0, 50));

    try {
      const res = await fetch(`${API}/api/driver-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Failed to submit application");
        return;
      }

      alert("Application submitted! Admin will review it soon.");

      setForm({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        experienceYears: "",
        carModel: "",
        carColor: "",
        carYear: "",
        licenseNumber: "",
        mood: "",
        availability: "full-time",
        agree: false,
        photo: "",
      });
    } catch {
      alert("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 px-4 py-8 flex justify-center">
      <div className="w-full max-w-3xl bg-black text-yellow-300 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-yellow-400">Become A Driver</h1>
          <p className="text-gray-300 mt-2 text-sm">
            Fill out the form below to apply as a GoTaxi driver
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Full Name *</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
            </div>
            <div>
              <label className="text-xs font-semibold">Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
            </div>
            <div>
              <label className="text-xs font-semibold">City *</label>
              <input name="city" value={form.city} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Experience (years) *</label>
              <input name="experienceYears" type="number" min="0" value={form.experienceYears} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
            </div>
            <div>
              <label className="text-xs font-semibold">Availability *</label>
              <select name="availability" value={form.availability} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50">
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="weekends">Weekends only</option>
                <option value="nights">Nights only</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold">Car Model *</label>
              <input name="carModel" value={form.carModel} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
            </div>
            <div>
              <label className="text-xs font-semibold">Car Year *</label>
              <input name="carYear" type="number" value={form.carYear} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold">Car Color *</label>
              <input name="carColor" value={form.carColor} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
            </div>
            <div>
              <label className="text-xs font-semibold">License Number *</label>
              <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold">Driving Style / Mood</label>
            <input name="mood" value={form.mood} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-yellow-500/50" />
          </div>

          <div>
            <label className="text-xs font-semibold">Profile Photo *</label>
            <input type="file" accept="image/*" required onChange={handleImage} className="w-full text-sm" />
          </div>

          <div className="flex items-start gap-2 text-xs">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            <label>I agree that the information provided is accurate.</label>
          </div>

          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-full transition">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Services;

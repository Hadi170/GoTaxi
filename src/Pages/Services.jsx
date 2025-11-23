import React, { useState } from "react";

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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("You must agree to the terms before applying.");
      return;
    }

    alert("Thank you for applying! We will review your information soon.");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 flex justify-center">
      <div className="w-full max-w-3xl bg-black text-yellow-300 rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Page Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-yellow-400">Become A Driver</h1>
          <p className="text-gray-300 mt-2 text-sm">
            Join GoTaxi by filling out the form below
          </p>
        </div>

        {/* Sub Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            Become a Driver
          </h2>
          <p className="text-sm text-gray-300">
            Fill out the form below to apply as a GoTaxi driver.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name + Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Full Name *</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Phone *</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+961 70 000 000"
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
                required
              />
            </div>
          </div>

          {/* Email + City */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">City *</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Beirut, Tripoli..."
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
                required
              />
            </div>
          </div>

          {/* Experience + Availability */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Experience (years) *</label>
              <input
                name="experienceYears"
                type="number"
                min="0"
                value={form.experienceYears}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Availability *</label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="weekends">Weekends only</option>
                <option value="nights">Nights only</option>
              </select>
            </div>
          </div>

          {/* Car section */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">Car Model *</label>
              <input
                name="carModel"
                value={form.carModel}
                onChange={handleChange}
                placeholder="Toyota Corolla"
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Car Year *</label>
              <input
                name="carYear"
                type="number"
                value={form.carYear}
                onChange={handleChange}
                placeholder="2018"
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Car Color *</label>
              <input
                name="carColor"
                value={form.carColor}
                onChange={handleChange}
                placeholder="White, black..."
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">License Number *</label>
              <input
                name="licenseNumber"
                value={form.licenseNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
                required
              />
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-xs font-semibold mb-1">Driving Style / Mood</label>
            <input
              name="mood"
              value={form.mood}
              onChange={handleChange}
              placeholder="Calm, talkative, music lover..."
              className="w-full px-3 py-2 rounded-lg bg-gray-900 text-yellow-200 border border-yellow-500/50"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-xs text-gray-200">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1"
            />
            <label>I agree that the information provided is accurate.</label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-full transition"
          >
            Submit Application
          </button>
        </form>

      </div>
    </div>
  );
};

export default Services;

import React from "react";
import { FaStar, FaCarSide, FaPhoneAlt } from "react-icons/fa";

const drivers = [
  {
    id: 1,
    name: "Ali Hassan",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4.9,
    mood: "Talkative & friendly",
    pricePerKm: 0.6,
    trips: 1240,
    isAvailable: true,
    car: "Hyundai Elantra 2019",
    years: 5,
    languages: ["Arabic", "English"],
  },
  {
    id: 2,
    name: "Sara Khalil",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 4.7,
    mood: "Calm & quiet",
    pricePerKm: 0.55,
    trips: 980,
    isAvailable: false,
    car: "Kia Picanto 2021",
    years: 3,
    languages: ["Arabic", "French", "English"],
  },
  {
    id: 3,
    name: "Mohamad Youssef",
    avatar: "https://i.pravatar.cc/150?img=30",
    rating: 4.8,
    mood: "Music lover",
    pricePerKm: 0.5,
    trips: 1500,
    isAvailable: true,
    car: "Toyota Corolla 2018",
    years: 6,
    languages: ["Arabic", "English"],
  },
  {
    id: 4,
    name: "Jad Maroun",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 4.6,
    mood: "Jokes & conversation",
    pricePerKm: 0.52,
    trips: 860,
    isAvailable: true,
    car: "Honda Civic 2020",
    years: 4,
    languages: ["Arabic", "English"],
  },
  {
    id: 5,
    name: "Rami Chouman",
    avatar: "https://i.pravatar.cc/150?img=17",
    rating: 4.3,
    mood: "Silent",
    pricePerKm: 0.48,
    trips: 670,
    isAvailable: false,
    car: "Nissan Sunny 2017",
    years: 5,
    languages: ["Arabic"],
  },
  {
    id: 6,
    name: "Layla Sobh",
    avatar: "https://i.pravatar.cc/150?img=52",
    rating: 4.9,
    mood: "Very friendly",
    pricePerKm: 0.58,
    trips: 1320,
    isAvailable: true,
    car: "Kia Rio 2022",
    years: 3,
    languages: ["Arabic", "English", "French"],
  },
  {
    id: 7,
    name: "Omar Daher",
    avatar: "https://i.pravatar.cc/150?img=28",
    rating: 4.5,
    mood: "Loves music, asks first",
    pricePerKm: 0.53,
    trips: 910,
    isAvailable: true,
    car: "Toyota Yaris 2019",
    years: 4,
    languages: ["Arabic", "English"],
  },
  {
    id: 8,
    name: "Noor Fares",
    avatar: "https://i.pravatar.cc/150?img=60",
    rating: 4.2,
    mood: "Chill & relaxed",
    pricePerKm: 0.47,
    trips: 540,
    isAvailable: false,
    car: "Hyundai i10 2018",
    years: 2,
    languages: ["Arabic"],
  },
];

const renderStars = (rating) => {
  const stars = [];
  const rounded = Math.round(rating); 

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={i <= rounded ? "text-yellow-400" : "text-gray-300"}
      />
    );
  }
  return stars;
};

const Drivers = () => {
  const handleBook = (driver) => {
    alert(`${driver.name} is on the way`);
  };

  return (
    <div className="min-h-screen bg-yellow-400 px-4 py-8">
      
      <div className="max-w-6xl mx-auto mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Our Drivers
          </h1>
          <p className="text-sm text-gray-600">
            Choose the driver that matches your mood, budget, and needs.
          </p>
        </div>
        <div className="flex gap-2 text-xs sm:text-sm">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
            ● Available now
          </span>
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold">
            ● Busy
          </span>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-white rounded-2xl shadow-md p-5 border border-yellow-300/60 flex flex-col justify-between"
          >
            {/* Top section: avatar + name + availability */}
            <div className="flex items-center gap-4">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400 shadow-sm"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-gray-900">
                    {driver.name}
                  </h2>
                  <span
                    className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                      driver.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {driver.isAvailable ? "Available" : "Busy"}
                  </span>
                </div>

                {/* Rating with 5 stars */}
                <div className="flex items-center gap-1 mt-1 text-sm">
                  <div className="flex">{renderStars(driver.rating)}</div>
                  <span className="ml-1 font-semibold">
                    {driver.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500 text-xs">
                    ({driver.trips} trips)
                  </span>
                </div>

                {/* Mood */}
                <p className="text-xs text-gray-600 mt-1">
                  Mood: <span className="font-medium">{driver.mood}</span>
                </p>
              </div>
            </div>

            {/* Car + info */}
            <div className="mt-4 space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <FaCarSide className="text-gray-700" />
                <span className="font-semibold">{driver.car}</span>
              </div>

              <div className="flex justify-between">
                <span>
                  Price:{" "}
                  <span className="font-bold text-yellow-600">
                    ${driver.pricePerKm.toFixed(2)}
                  </span>{" "}
                  / km
                </span>
                <span>
                  Exp:{" "}
                  <span className="font-semibold">{driver.years} yrs</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>
                  Languages:{" "}
                  <span className="font-medium">
                    {driver.languages.join(" · ")}
                  </span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleBook(driver)}
                disabled={!driver.isAvailable}
                className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2 rounded-full border transition
                  ${
                    driver.isAvailable
                      ? "bg-yellow-400 hover:bg-yellow-500 border-yellow-500 text-gray-900"
                      : "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <span>Book this driver</span>
              </button>

              <button
                className="px-3 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-1"
              >
                <FaPhoneAlt className="text-xs" />
                Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drivers;

"use client";
import React from "react";

import { getLocations } from "@/app/actions/auth";

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

const BookingForm = () => {
  const [locations, setLocations] = React.useState<Location[]>([]);
  React.useEffect(() => {
    const fetchLocations = async () => {
      const res = await getLocations();
      if (res.status === 200 && res.body?.locations) {
        setLocations(res.body.locations);
      } else {
        console.error("Failed to get locations:", res.error);
      }
    };
    fetchLocations();
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <form onSubmit={handleBooking} className="space-y-4 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            required
            className="w-full rounded-md px-4 py-2 bg-white/10 text-white border border-white/20 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-white mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            required
            className="w-full rounded-md px-4 py-2 bg-white/10 text-white border border-white/20 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white mb-1">
            Pickup Location
          </label>
          <select
            name="pickupLocation"
            required
            className="w-full rounded-md px-4 py-2 bg-white/10 text-white border border-white/20 focus:outline-none"
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id} className="text-black">   
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white mb-1">
            Drop-off Location
          </label>
          <select
            name="dropoffLocation"
            required
            className="w-full rounded-md px-4 py-2 bg-white/10 text-white border border-white/20 focus:outline-none"
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id} className="text-black">
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition duration-200"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;

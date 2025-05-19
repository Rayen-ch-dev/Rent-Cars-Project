"use client";
import React, { useEffect, useRef, useState } from "react";
import { getLocations } from "@/app/actions/auth";
import { toast } from "sonner";
import { bookingSchema } from "@/validations/auth";
import type { Car } from "@/types/car";
import { addBooking } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

const BookingForm = ({
  price,
  car,
  user,
}: {
  price: number;
  car: Car;
  user: Pick<User, "id">;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [TotalePrice, setTotalePrice] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!startDate || !endDate) {
      setTotalePrice(0);
      setError(false);
      return;
    }

    const diffInDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays > 0 && price) {
      const total = diffInDays * price;
      setTotalePrice(total);
      setError(false);
    } else {
      setTotalePrice(0);
      setError(true);
    }
  }, [startDate, endDate]);

  useEffect(() => {
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

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formRef.current as HTMLFormElement);

    const values = {
      startDate: new Date(formData.get("startDate") as string),
      endDate: new Date(formData.get("endDate") as string),
      carId: car.id,
      car: car,
      pickupLocationId: formData.get("pickupLocation") as string,
      dropoffLocationId: formData.get("dropoffLocation") as string,
      totalPrice: TotalePrice,
    };
    const result = bookingSchema.safeParse(values);

    if (!result.success) {
      console.error(result.error.format());
      toast.error("Invalid date range");
      result.error.errors.forEach((err) => toast.error(err.message));
      return;
    }

    setError(false);
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("startDate", values.startDate.toISOString());
      formData.append("endDate", values.endDate.toISOString());
      formData.append("carId", values.carId);
      formData.append("pickupLocationId", values.pickupLocationId);
      formData.append("dropoffLocationId", values.dropoffLocationId);
      formData.append("userId", user.id);

      const res = await addBooking(formData);
      if (res.status === 201) {
        toast.success("Booking added successfully");
        router.push(`/cards`);
      } else {
        console.error("Failed to add booking:", res.error);
        toast.error("Failed to add booking");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding booking:", error);
      toast.error("Error adding booking");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleBooking} ref={formRef} className="space-y-4 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            required
            className="w-full rounded-md px-4 py-2 bg-white/10 text-white border border-white/20 focus:outline-none"
            onChange={(e) => {
              e.target.valueAsDate && setStartDate(e.target.valueAsDate);
            }}
          />
        </div>
        <div>
          <label className="block text-sm text-white mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            required
            className="w-full rounded-md px-4 py-2 bg-white/10 text-white border border-white/20 focus:outline-none"
            onChange={(e) => {
              e.target.valueAsDate && setEndDate(e.target.valueAsDate);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {startDate && endDate && (
        <div className={error ? "text-red-500" : "text-white"}>
          Total Price: {TotalePrice.toFixed(2)} DT
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition duration-200"
        disabled={isLoading}
      >
        {isLoading ? "Booking..." : "Book"}
      </button>
    </form>
  );
};

export default BookingForm;

"use client";

import { useRouter } from "next/navigation";
import { updateBooking } from "@/app/actions/auth";
import { SubmitButton } from "./ui/SubmitButton";

interface EditBookingFormProps {
  booking: {
    id: string;
    userId: string;
    carId: string;
    car: {
      name: string;
    };
    startDate: Date;
    endDate: Date;
    pickupLocationId: string;
    dropoffLocationId: string;
  };
  locations: Array<{
    id: string;
    name: string;
  }>;
}

export function EditBookingForm({ booking, locations }: EditBookingFormProps) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      await updateBooking(formData);
      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error("Error updating booking:", error);
      // You might want to show an error message to the user here
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="bookingId" value={booking.id} />
      <input type="hidden" name="userId" value={booking.userId} />

      <div>
        <label className="block text-sm font-medium mb-2">Car</label>
        <input
          type="text"
          value={booking.car.name}
          disabled
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input type="hidden" name="carId" value={booking.carId} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Start Date</label>
        <input
          type="date"
          name="startDate"
          defaultValue={new Date(booking.startDate).toISOString().split("T")[0]}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">End Date</label>
        <input
          type="date"
          name="endDate"
          defaultValue={new Date(booking.endDate).toISOString().split("T")[0]}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Pickup Location
        </label>
        <select
          name="pickupLocationId"
          defaultValue={booking.pickupLocationId}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Dropoff Location
        </label>
        <select
          name="dropoffLocationId"
          defaultValue={booking.dropoffLocationId}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <SubmitButton />
        <a
          href="/profile"
          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

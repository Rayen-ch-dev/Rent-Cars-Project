"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

interface Car {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface Booking {
  id: string;
  car: Car;
  startDate: Date;
  endDate: Date;
  pickupLocation: Location;
  dropoffLocation: Location;
}

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  //const router = useRouter();
  //const [isDeleting, setIsDeleting] = useState(false);
/*
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      toast.success("Booking deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking");
    } finally {
      setIsDeleting(false);
    }
  };*/



  return (
    <div className="bg-gray-900  rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-blue-500 transition-all duration-300">
      <div className="relative h-72 w-full">
        <Image
          src={booking.car.imageUrl}
          alt={booking.car.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">{booking.car.name}</h3>
        
        <div className="space-y-3 text-gray-300">
          <div className="flex justify-between">
            <span className="font-medium">Start Date:</span>
            <span>{format(new Date(booking.startDate), "PPP")}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">End Date:</span>
            <span>{format(new Date(booking.endDate), "PPP")}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Price:</span>
            <span>${booking.car.price}/day</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Pickup:</span>
            <span>{booking.pickupLocation.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Dropoff:</span>
            <span>{booking.dropoffLocation.name}</span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default BookingCard;
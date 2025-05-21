import React from "react";
import { auth } from "@/auth";
import BookingCard from "@/components/BookingCard";
import { db } from "@/db";
import { redirect } from "next/navigation";
const BookingsPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const bookings = await db.booking.findMany({
    where: { userId: session.user.id },
    include: {
      car: true,
      pickupLocation: true,
      dropoffLocation: true,
    },
  });

  return (
    <div className="min-h-screen mt-10 bg-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, <span className="text-blue-400">{session.user.name}</span>!
        </h1>
        <p className="text-gray-400 text-lg">
          Here's a summary of your bookings. Enjoy your ride!
        </p>
      </div>

      {/* Bookings Section */}
      <div className="max-w-7xl mx-auto">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl text-gray-400">No bookings found</h2>
            <p className="text-gray-500 mt-2">
              Start booking your dream car today!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;

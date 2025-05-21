import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { db } from "@/db";
import { deleteBooking, updateBooking } from "@/app/actions/auth";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const bookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      car: true,
      pickupLocation: true,
      dropoffLocation: true,
    },
  });

  console.log(bookings);

  return (
    <div className="min-h-screen mt-15 bg-black py-12 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-12 border border-blue-500">
          {/* Profile Header */}
          <div className="relative h-48 w-full bg-black">
            <div className="absolute -bottom-16 left-8">
              <div className="relative w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden shadow-md">
                <Image
                  src={session.user.image || "/images/userIcon.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-wide text-blue-400">
                {session.user.name}
              </h1>
              <p className="text-gray-300">{session.user.email}</p>
            </div>

            {/* Simplified Profile Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
              <div className="bg-black rounded-lg p-6 border border-blue-500">
                <h3 className="text-lg font-semibold text-blue-400">Role</h3>
                <p className="text-gray-300">{user?.role}</p>
              </div>
              <div className="bg-black rounded-lg p-6 border border-blue-500">
                <h3 className="text-lg font-semibold text-blue-400">
                  Member Since
                </h3>
                <p className="text-gray-300">
                  {user?.createdAt.toLocaleDateString()}
                </p>
              </div>
              <div className="bg-black rounded-lg p-6 border border-blue-500">
                <h3 className="text-lg font-semibold text-blue-400">Status</h3>
                <p className="text-gray-300">Active</p>
              </div>
            </div>

            {/* Profile Actions */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Edit Profile
              </button>
              <button className="px-6 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-900 transition-colors font-semibold">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Booking Cards Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-blue-400">
            Your Booked Cars
          </h2>

          <div className="grid grid-cols-1 w-full h-full lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-blue-500 transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={booking.car.imageUrl || "/images/car-placeholder.jpg"}
                    alt={booking.car.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">
                    {booking.car.name}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="font-semibold">Start:</span>{" "}
                      {booking.startDate.toLocaleDateString()}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">End:</span>{" "}
                      {booking.endDate.toLocaleDateString()}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Price:</span> $
                      {booking.car.price}/day
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Pickup:</span>{" "}
                      {booking.pickupLocation.name}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Dropoff:</span>{" "}
                      {booking.dropoffLocation.name}
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        href="/cards"
                        className="w-36 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition-colors font-semibold"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Details
                      </a>

                      <a
                        href={`/edit-booking/${booking.id}`}
                        className="w-36 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-400 transition-colors font-semibold"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536M9 11l6-6m2 2L9 17H5v-4l10-10z"
                          />
                        </svg>
                        Edit
                      </a>

                      <form action={deleteBooking}>
                        <input
                          type="hidden"
                          name="bookingId"
                          value={booking.id}
                        />
                        <button
                          type="submit"
                          className="w-36 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition-colors font-semibold"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;

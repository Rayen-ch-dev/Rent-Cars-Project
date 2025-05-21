import React from "react";
import { db } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { EditBookingForm } from "@/components/EditBookingForm";

interface EditBookingPageProps {
  params: {
    id: string;
  };
}

const EditBookingPage = async ({ params }: EditBookingPageProps) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const booking = await db.booking.findUnique({
    where: {
      id: params.id,
    },
    include: {
      car: true,
      pickupLocation: true,
      dropoffLocation: true,
    },
  });

  if (!booking) {
    redirect("/profile");
  }

  const locations = await db.location.findMany();

  return (
    <div className="min-h-screen bg-black py-12 text-white">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Edit Booking</h1>
        <EditBookingForm booking={booking} locations={locations} />
      </div>
    </div>
  );
};

export default EditBookingPage;

import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import Image from "next/image";
import { getCars } from "../actions/auth";
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";

const Page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }


  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (user?.role !== "ADMIN") {
    redirect("/");
  }

  const cars = await getCars();

  return (
    <div className="min-h-screen mt-16 bg-black">
      {/* Admin Header */}
      <header className="bg-black border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-white">{session.user.name}</span>
            <div className="h-10 w-10 rounded-full bg-white/10 overflow-hidden ring-2 ring-white/20">
              <Image
                src={session.user.image || "/admin-avatar.png"}
                alt="Admin"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4 text-white">Car List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="border border-white/20 rounded-lg p-4 bg-black/50 hover:bg-black/70 transition-colors duration-200"
              >
                <div className="aspect-w-16 aspect-h-9 mb-4 rounded-md overflow-hidden border border-white/20">
                  <Image
                    src={car.imageUrl || "/car-placeholder.jpg"}
                    alt={car.name}
                    width={300}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h4 className="font-medium text-white">{car.name}</h4>
                <p className="text-gray-400">Description: {car.description}</p>
                <p className="text-gray-400">Year: {car.year}</p>
                <p className="text-gray-400">
                  Price: ${car.price.toLocaleString()}
                </p>
                <div className="flex gap-2 mt-4">
                  <EditButton
                    carId={car.id}
                    initialData={{
                      name: car.name,
                      description: car.description,
                      year: car.year,
                      price: car.price,
                      imageUrl: car.imageUrl,
                      features: car.features,
                    }}
                  />
                  <DeleteButton carId={car.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

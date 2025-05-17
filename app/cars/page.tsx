// app/cars/page.tsx or wherever this is in App Router
import Image from "next/image";
import { db } from "@/db";
import ClientCarCard from "@/components/ClientCarCard";

export default async function CarsPage() {  


  const cars = await db.car.findMany();
  return (
    <div className="container mx-auto min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Featured Cars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="relative h-48 w-full">
              <Image
                src={car.imageUrl} // Use car.image if available
                alt={car.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{car.name}</h2>
                <span className="text-xl font-semibold text-blue-600">
                  ${car.price}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{car.description}</p>

              <div className="space-y-2">
                {Array.isArray(car.features) &&
                  car.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
              </div>
                <BookNowButton key={car.id} car={car} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;

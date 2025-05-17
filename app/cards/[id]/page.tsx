
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";


type Props = {
  params: {
    id: string;
  };
};

export default async function CarDetailsPage({ params }: Props) {
  if (!/^[0-9a-fA-F]{24}$/.test(params.id)) {
    redirect("/cards");
  }

  const car = await db.car.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!car) {
    return notFound();
  }


  return (
    <div className="min-h-screen mt-20 shadow-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
            {/* Image Section */}
            <div className="relative h-96 lg:h-[550px] rounded-xl overflow-hidden border border-white/10">
              <Image
                src="/Images/photoCar-removebg-preview.png"
                alt={car.name}
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                priority
              />
            </div>

            {/* Details and Booking Section */}
            <div className="flex flex-col justify-between text-white">
              <div className="space-y-6">
                {/* Title and Price */}
                <div>
                  <h1 className="text-5xl font-extrabold text-white">
                    {car.name}
                  </h1>
                  <p className="text-3xl font-semibold text-blue-500 mt-2">
                    ${car.price.toLocaleString()}
                  </p>
                </div>

                {/* Info */}
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-400">Year:</span>
                    <span>{car.year}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Description
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {car.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Features
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {car.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <BookingForm />

              </div>

              {/* Optional: Contact Dealer */}
              <div className="mt-8">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition duration-200">
                  Contact Dealer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

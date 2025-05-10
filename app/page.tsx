import "./globals.css";
export default function Home() {
  return (
    <div className="container mx-auto bg-black ">
      <div>
      <h1 className="text-6xl">Car Rental</h1>
      <p>
        EasyRide offers fast, affordable car rentals with a simple booking
        process and reliable vehicles for any trip.
      </p>
      <button className="border bg-amber-50 hover:bg-black hover:text-white transition duration-300 text-black mr-4 px-4 py-2 rounded-md">
        Book Now
      </button>
      <button className="border hover:bg-white hover:text-black transition duration-300 text-white mr-4 px-4 py-2 rounded-md">
        Explore Us
      </button>
      </div>
      <div>
      </div>
      
    </div>
  );
}

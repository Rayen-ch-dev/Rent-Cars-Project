import Image from "next/image";
import "./globals.css";
import Link from "next/link";
export default function Home() {

  return (
    <div className="container mb-40 mx-auto bg-black flex  justify-center items-center">
      <div className="w-1/2 -ml-64 mt-32" >
      <h1 className="text-6xl py-3.5">Car Rental</h1>
      <p className="py-3.5 text-2xl">
        EasyRide offers fast, affordable car rentals with a simple booking
        process and reliable vehicles for any trip.
      </p>
      <Link href="/cars" className="border bg-amber-50 hover:bg-black hover:text-white transition duration-300 text-black mr-4 px-4 py-2 rounded-md">
        Get Started
      </Link>
      <Link href="/contact" className="border hover:bg-white hover:text-black transition duration-300 text-white mr-4 px-4 py-2 rounded-md">
        Contact Us
      </Link>
      </div>
      <div className="-mr-64  ">
        <div className="mt-56">
          <Image
            src={"/Images/photoCar-removebg-preview.png"}
            width={600}
            height={600}
            alt="backgroundImage"
          />
        </div>
      </div>
      
    </div>
  );
}

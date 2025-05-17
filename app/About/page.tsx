import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="container mt-52 mr-64 mx-auto bg-black flex ">
      <div>
        <Image
          src="/Images/mclaren-gts-2024-1280-removebg-preview.png"
          alt=""
          width={700}
          height={500}
        />
      </div>
      <div className="w-1/2 ">
        <p className=" font-bold text-white ml-10 text-justify text-5xl">About Us</p>
        <p className=" text-white font-bold mt-10 text-base ml-10 text-justify">
          Welcome to our Rental Car Project – your trusted solution for 
          convenient, affordable, and reliable vehicle rentals. Our platform is 
          designed to simplify the car rental process by offering a seamlessbr 
          experience from booking to return. Whether you're traveling for 
          business, planning a road trip, or need a temporary replacement 
          vehicle, we provide a wide selection of well-maintained cars to suit 
          every need and budget. With a user-friendly interface, transparent 
          pricing, and a commitment to customer satisfaction, our goal is to 
          make mobility easier and more accessible for everyone. 
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

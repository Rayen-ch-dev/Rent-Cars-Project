import React from "react";
import Image from "next/image";
import ContactFields from "@/components/ui/ContactFields";
const ContactPage = () => {
  return (
    <div className="container mx-auto min-h-screen flex p-8">
      <div className="flex flex-col mt-24 w-1/2">
        <h1 className="text-5xl font-bold mb-8">Contact Us</h1>

        <div className="space-y-6 text-white text-lg mt-10">
          <ContactFields
            linker="+216 25 111 444"
            imageUrl="/Images/PhoneImage.png"
          />
          <ContactFields
            linker="RentalCar@gmail.com"
            imageUrl="/Images/EmailImage.png"
          />
          <ContactFields
            linker="Street 123, City, Country"
            imageUrl="/Images/PositionImage.png"
          />
        </div>
      </div>

      <div className="ml-20">
        <Image
          src="/Images/Contact us-amico.png"
          alt="Contact Illustration"
          width={500}
          height={200}
          className="transition-transform mt-20"
        />
      </div>
    </div>
  );
};

export default ContactPage;

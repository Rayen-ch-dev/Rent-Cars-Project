"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Car } from "@/types/car";
type Props = {
  car: Car;
};
export default function BookNowButton({ car }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBookNow = () => {
    if (session) {
      router.push(`/cards/${car.id}`);
    } else {
      const callbackUrl = encodeURIComponent(`/cards/${car.id}`);
      router.push(`/login?callbackUrl=${callbackUrl}`);
    }
  };

  return (
    <button
      onClick={handleBookNow}
      className="inline-flex justify-center  items-center gap-2 w-full mt-4 bg-black hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200"
    >
      <span>Book Now</span>
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </button>
  );
}
